const express = require('express');
const { body, validationResult } = require('express-validator');
const Criminal = require('../models/Criminal');
const { auth, officerAuth } = require('../middleware/auth');
const { uploadPhoto } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/criminals
// @desc    Get all criminals with filtering and pagination
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search,
      gender,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (gender) filter.gender = gender;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'address.city': { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const criminals = await Criminal.find(filter)
      .populate('crimeRecords', 'title type caseNumber status')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Criminal.countDocuments(filter);

    res.json({
      criminals,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get criminals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/criminals/:id
// @desc    Get criminal by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const criminal = await Criminal.findById(req.params.id)
      .populate('crimeRecords', 'title type caseNumber status date officerInCharge');

    if (!criminal) {
      return res.status(404).json({ message: 'Criminal not found' });
    }

    res.json(criminal);
  } catch (error) {
    console.error('Get criminal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/criminals
// @desc    Create new criminal
// @access  Private (Officer+)
router.post('/', [auth, officerAuth, uploadPhoto.single('photo')], [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('address.city').trim().isLength({ min: 2 }).withMessage('City is required'),
  body('address.state').trim().isLength({ min: 2 }).withMessage('State is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const criminalData = { ...req.body };

    // Handle photo upload
    if (req.file) {
      criminalData.photo = `/uploads/photos/${req.file.filename}`;
    }

    const criminal = new Criminal(criminalData);
    await criminal.save();

    res.status(201).json({
      message: 'Criminal profile created successfully',
      criminal
    });
  } catch (error) {
    console.error('Create criminal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/criminals/:id
// @desc    Update criminal
// @access  Private (Officer+)
router.put('/:id', [auth, officerAuth, uploadPhoto.single('photo')], async (req, res) => {
  try {
    const criminal = await Criminal.findById(req.params.id);
    
    if (!criminal) {
      return res.status(404).json({ message: 'Criminal not found' });
    }

    const updateData = { ...req.body };

    // Handle photo upload
    if (req.file) {
      updateData.photo = `/uploads/photos/${req.file.filename}`;
    }

    const updatedCriminal = await Criminal.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('crimeRecords', 'title type caseNumber status');

    res.json({
      message: 'Criminal profile updated successfully',
      criminal: updatedCriminal
    });
  } catch (error) {
    console.error('Update criminal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/criminals/:id
// @desc    Delete criminal
// @access  Private (Officer+)
router.delete('/:id', [auth, officerAuth], async (req, res) => {
  try {
    const criminal = await Criminal.findById(req.params.id);
    
    if (!criminal) {
      return res.status(404).json({ message: 'Criminal not found' });
    }

    await Criminal.findByIdAndDelete(req.params.id);

    res.json({ message: 'Criminal profile deleted successfully' });
  } catch (error) {
    console.error('Delete criminal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/criminals/:id/link-crime
// @desc    Link criminal to a crime
// @access  Private (Officer+)
router.post('/:id/link-crime', [auth, officerAuth], async (req, res) => {
  try {
    const { crimeId } = req.body;
    
    const criminal = await Criminal.findById(req.params.id);
    if (!criminal) {
      return res.status(404).json({ message: 'Criminal not found' });
    }

    // Add crime to criminal's record if not already linked
    if (!criminal.crimeRecords.includes(crimeId)) {
      criminal.crimeRecords.push(crimeId);
      await criminal.save();
    }

    res.json({ message: 'Criminal linked to crime successfully' });
  } catch (error) {
    console.error('Link crime error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;