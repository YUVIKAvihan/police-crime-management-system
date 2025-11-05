const mongoose = require('mongoose');

const criminalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  photo: {
    type: String,
    default: null
  },
  previousCrimes: [{
    type: String,
    trim: true
  }],
  crimeRecords: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crime'
  }],
  identificationMarks: {
    type: String,
    trim: true
  },
  fingerprints: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'imprisoned', 'deceased', 'unknown'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for search functionality
criminalSchema.index({ name: 'text', 'address.city': 'text' });

module.exports = mongoose.model('Criminal', criminalSchema);