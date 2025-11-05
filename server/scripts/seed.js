const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Crime = require('../models/Crime');
const Criminal = require('../models/Criminal');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Crime.deleteMany({});
    await Criminal.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@police.gov',
      password: 'admin123',
      role: 'admin',
      station: 'Central Police Station',
      badgeNumber: 'ADM001'
    });
    await adminUser.save();

    // Create officer users
    const officer1 = new User({
      name: 'John Smith',
      email: 'john.smith@police.gov',
      password: 'officer123',
      role: 'officer',
      station: 'Downtown Police Station',
      badgeNumber: 'OFF001'
    });
    await officer1.save();

    const officer2 = new User({
      name: 'Sarah Johnson',
      email: 'sarah.johnson@police.gov',
      password: 'officer123',
      role: 'officer',
      station: 'North District Station',
      badgeNumber: 'OFF002'
    });
    await officer2.save();

    console.log('Created users');

    // Create sample criminals
    const criminal1 = new Criminal({
      name: 'Robert Wilson',
      age: 35,
      gender: 'male',
      address: {
        street: '123 Oak Street',
        city: 'Springfield',
        state: 'Illinois',
        zipCode: '62701',
        country: 'USA'
      },
      previousCrimes: ['Theft (2019)', 'Burglary (2020)'],
      identificationMarks: 'Scar on left cheek, tattoo on right arm',
      status: 'active'
    });
    await criminal1.save();

    const criminal2 = new Criminal({
      name: 'Maria Garcia',
      age: 28,
      gender: 'female',
      address: {
        street: '456 Pine Avenue',
        city: 'Springfield',
        state: 'Illinois',
        zipCode: '62702',
        country: 'USA'
      },
      previousCrimes: ['Fraud (2021)'],
      identificationMarks: 'Birthmark on neck',
      status: 'imprisoned'
    });
    await criminal2.save();

    console.log('Created criminals');

    // Create sample crimes
    const crime1 = new Crime({
      title: 'Downtown Bank Robbery',
      type: 'robbery',
      description: 'Armed robbery at First National Bank. Three suspects entered the bank at approximately 2:30 PM, demanded money from tellers, and fled the scene in a stolen vehicle.',
      location: {
        address: '100 Main Street',
        city: 'Springfield',
        state: 'Illinois'
      },
      date: new Date('2024-01-15'),
      status: 'under_investigation',
      officerInCharge: officer1._id,
      suspects: [criminal1._id],
      victims: [{
        name: 'Bank Teller 1',
        age: 32,
        gender: 'female',
        contact: '555-0101',
        address: '789 Elm Street, Springfield, IL'
      }],
      priority: 'high'
    });
    await crime1.save();

    const crime2 = new Crime({
      title: 'Residential Burglary on Oak Street',
      type: 'burglary',
      description: 'Break-in reported at residential property. Multiple items stolen including electronics and jewelry. No signs of forced entry, suggesting perpetrator had access to keys.',
      location: {
        address: '234 Oak Street',
        city: 'Springfield',
        state: 'Illinois'
      },
      date: new Date('2024-01-20'),
      status: 'open',
      officerInCharge: officer2._id,
      victims: [{
        name: 'John Doe',
        age: 45,
        gender: 'male',
        contact: '555-0102',
        address: '234 Oak Street, Springfield, IL'
      }],
      priority: 'medium'
    });
    await crime2.save();

    const crime3 = new Crime({
      title: 'Cybercrime - Identity Theft',
      type: 'cybercrime',
      description: 'Victim reported unauthorized access to bank accounts and credit cards. Investigation revealed sophisticated phishing scheme targeting local residents.',
      location: {
        address: '567 Digital Avenue',
        city: 'Springfield',
        state: 'Illinois'
      },
      date: new Date('2024-01-25'),
      status: 'closed',
      officerInCharge: officer1._id,
      suspects: [criminal2._id],
      victims: [{
        name: 'Jane Smith',
        age: 38,
        gender: 'female',
        contact: '555-0103',
        address: '567 Digital Avenue, Springfield, IL'
      }],
      priority: 'high'
    });
    await crime3.save();

    // Link criminals to crimes
    criminal1.crimeRecords.push(crime1._id);
    await criminal1.save();

    criminal2.crimeRecords.push(crime3._id);
    await criminal2.save();

    console.log('Created crimes and linked to criminals');

    console.log('Database seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@police.gov / admin123');
    console.log('Officer 1: john.smith@police.gov / officer123');
    console.log('Officer 2: sarah.johnson@police.gov / officer123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedDatabase();