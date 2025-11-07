const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const crimeRoutes = require('./routes/crimes');
const criminalRoutes = require('./routes/criminals');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crimes', crimeRoutes);
app.use('/api/criminals', criminalRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
const connectDB = require('./config/database');
const createDefaultAdmin = require('./scripts/auto-create-admin');

connectDB().then(() => {
  // Auto-create admin user and sample data after database connection
  setTimeout(async () => {
    await createDefaultAdmin();
    // Add a small delay before creating sample data
    setTimeout(() => {
      console.log('🌱 Loading sample data...');
      require('./scripts/auto-sample-data');
    }, 2000);
  }, 1000);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local access: http://localhost:${PORT}`);
  console.log(`Network access: http://172.21.129.71:${PORT}`);
});