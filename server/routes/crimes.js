const express = require('express');
const { body, validationResult } = require('express-validator');
const Crime = require('../models/Crime');
const { auth, officerAuth } = require('../middleware/auth');
const { uploadEvidence } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/crimes
// @desc    Get all crimes with filtering and pagination
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      type, 
      officer, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (officer) filter.officerInCharge = officer;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { caseNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const crimes = await Crime.find(filter)
      .populate('officerInCharge', 'name email station')
      .populate('suspects', 'name age gender')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Crime.countDocuments(filter);

    res.json({
      crimes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get crimes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/crimes/stats
// @desc    Get crime statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const totalCrimes = await Crime.countDocuments();
    const openCases = await Crime.countDocuments({ status: 'open' });
    const underInvestigation = await Crime.countDocuments({ status: 'under_investigation' });
    const closedCases = await Crime.countDocuments({ status: 'closed' });

    // Crime types distribution
    const crimeTypes = await Crime.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Recent crimes (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentCrimes = await Crime.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      totalCrimes,
      openCases,
      underInvestigation,
      closedCases,
      crimeTypes,
      recentCrimes
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/crimes/:id
// @desc    Get crime by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const crime = await Crime.findById(req.params.id)
      .populate('officerInCharge', 'name email station badgeNumber')
      .populate('suspects', 'name age gender address photo');

    if (!crime) {
      return res.status(404).json({ message: 'Crime not found' });
    }

    res.json(crime);
  } catch (error) {
    console.error('Get crime error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/crimes
// @desc    Create new crime
// @access  Private (Officer+)
router.post('/', [auth, officerAuth, uploadEvidence.array('evidence', 5)], [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('type').isIn(['murder', 'theft', 'cybercrime', 'assault', 'fraud', 'burglary', 'robbery', 'vandalism', 'drug_offense', 'other']).withMessage('Invalid crime type'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('location.address').trim().isLength({ min: 5 }).withMessage('Address is required'),
  body('location.city').trim().isLength({ min: 2 }).withMessage('City is required'),
  body('location.state').trim().isLength({ min: 2 }).withMessage('State is required'),
  body('date').isISO8601().withMessage('Valid date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const crimeData = {
      ...req.body,
      officerInCharge: req.user._id
    };

    // Handle evidence files
    if (req.files && req.files.length > 0) {
      crimeData.evidence = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        description: req.body.evidenceDescription || ''
      }));
    }

    const crime = new Crime(crimeData);
    await crime.save();

    const populatedCrime = await Crime.findById(crime._id)
      .populate('officerInCharge', 'name email station');

    res.status(201).json({
      message: 'Crime created successfully',
      crime: populatedCrime
    });
  } catch (error) {
    console.error('Create crime error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/crimes/:id
// @desc    Update crime
// @access  Private (Officer+)
router.put('/:id', [auth, officerAuth], async (req, res) => {
  try {
    const crime = await Crime.findById(req.params.id);
    
    if (!crime) {
      return res.status(404).json({ message: 'Crime not found' });
    }

    // Check if user is the officer in charge or admin
    if (req.user.role !== 'admin' && crime.officerInCharge.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this crime' });
    }

    const updatedCrime = await Crime.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('officerInCharge', 'name email station');

    res.json({
      message: 'Crime updated successfully',
      crime: updatedCrime
    });
  } catch (error) {
    console.error('Update crime error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/crimes/:id
// @desc    Delete crime
// @access  Private (Admin only)
router.delete('/:id', [auth, officerAuth], async (req, res) => {
  try {
    const crime = await Crime.findById(req.params.id);
    
    if (!crime) {
      return res.status(404).json({ message: 'Crime not found' });
    }

    // Only admin or the officer in charge can delete
    if (req.user.role !== 'admin' && crime.officerInCharge.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this crime' });
    }

    await Crime.findByIdAndDelete(req.params.id);

    res.json({ message: 'Crime deleted successfully' });
  } catch (error) {
    console.error('Delete crime error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;