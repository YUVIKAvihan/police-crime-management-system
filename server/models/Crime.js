const mongoose = require('mongoose');

const crimeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['murder', 'theft', 'cybercrime', 'assault', 'fraud', 'burglary', 'robbery', 'vandalism', 'drug_offense', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    address: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'under_investigation', 'closed'],
    default: 'open'
  },
  officerInCharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  suspects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Criminal'
  }],
  victims: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    contact: String,
    address: String
  }],
  evidence: [{
    filename: String,
    originalName: String,
    path: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    description: String
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  caseNumber: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Generate case number before saving
crimeSchema.pre('save', async function(next) {
  try {
    if (!this.caseNumber) {
      const year = new Date().getFullYear();
      const count = await this.constructor.countDocuments();
      this.caseNumber = `CASE-${year}-${String(count + 1).padStart(6, '0')}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Index for search functionality
crimeSchema.index({ title: 'text', description: 'text', type: 1, status: 1 });

module.exports = mongoose.model('Crime', crimeSchema);