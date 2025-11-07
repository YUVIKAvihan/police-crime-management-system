const Crime = require('../models/Crime');
const Criminal = require('../models/Criminal');
const User = require('../models/User');

const createSampleData = async () => {
  try {
    // Check if sample data already exists
    const existingCrimes = await Crime.countDocuments();
    const existingCriminals = await Criminal.countDocuments();

    if (existingCrimes > 0 || existingCriminals > 0) {
      console.log('ℹ️  Sample data already exists');
      return;
    }

    console.log('🌱 Creating sample data...');

    // Get admin user for officer assignment
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('❌ Admin user not found, skipping sample data');
      return;
    }

    // Create sample criminals
    const criminals = [
      {
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
        identificationMarks: 'Scar on left cheek, dragon tattoo on right arm',
        status: 'active'
      },
      {
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
        previousCrimes: ['Credit Card Fraud (2021)'],
        identificationMarks: 'Birthmark on neck, rose tattoo on wrist',
        status: 'imprisoned'
      },
      {
        name: 'James Thompson',
        age: 42,
        gender: 'male',
        address: {
          street: '789 Elm Street',
          city: 'Springfield',
          state: 'Illinois',
          zipCode: '62703',
          country: 'USA'
        },
        previousCrimes: ['Drug Possession (2019)', 'Vandalism (2017)'],
        identificationMarks: 'Multiple tattoos on both arms',
        status: 'active'
      }
    ];

    const createdCriminals = await Criminal.insertMany(criminals);
    console.log(`✅ Created ${createdCriminals.length} sample criminals`);

    // Create sample crimes
    const crimes = [
      {
        title: 'Downtown Bank Robbery',
        type: 'robbery',
        description: 'Armed robbery at First National Bank. Three masked suspects entered the bank and demanded money from tellers.',
        location: {
          address: '100 Main Street',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: new Date('2024-01-15'),
        status: 'under_investigation',
        officerInCharge: adminUser._id,
        suspects: [createdCriminals[0]._id],
        victims: [{
          name: 'Jennifer Adams',
          age: 32,
          gender: 'female',
          contact: '555-0101',
          address: '789 Elm Street, Springfield, IL'
        }],
        priority: 'high'
      },
      {
        title: 'Residential Burglary',
        type: 'burglary',
        description: 'Break-in reported at residential property. Electronics and jewelry stolen.',
        location: {
          address: '234 Oak Street',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: new Date('2024-01-20'),
        status: 'open',
        officerInCharge: adminUser._id,
        suspects: [createdCriminals[1]._id],
        victims: [{
          name: 'David Wilson',
          age: 45,
          gender: 'male',
          contact: '555-0103',
          address: '234 Oak Street, Springfield, IL'
        }],
        priority: 'medium'
      },
      {
        title: 'Cybercrime Investigation',
        type: 'cybercrime',
        description: 'Identity theft case involving multiple victims and sophisticated phishing schemes.',
        location: {
          address: '567 Digital Avenue',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: new Date('2024-01-25'),
        status: 'closed',
        officerInCharge: adminUser._id,
        suspects: [createdCriminals[2]._id],
        victims: [{
          name: 'Lisa Chen',
          age: 38,
          gender: 'female',
          contact: '555-0104',
          address: '567 Digital Avenue, Springfield, IL'
        }],
        priority: 'critical'
      },
      {
        title: 'Assault at Downtown Bar',
        type: 'assault',
        description: 'Physical altercation resulted in serious injuries. Suspect attacked victim with a broken bottle.',
        location: {
          address: '123 Bar Street',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: new Date('2024-02-01'),
        status: 'under_investigation',
        officerInCharge: adminUser._id,
        victims: [{
          name: 'Kevin Murphy',
          age: 29,
          gender: 'male',
          contact: '555-0106',
          address: '321 Residential Ave, Springfield, IL'
        }],
        priority: 'high'
      },
      {
        title: 'Drug Trafficking Operation',
        type: 'drug_offense',
        description: 'Large-scale drug trafficking operation discovered. Multiple arrests made.',
        location: {
          address: '999 Warehouse District',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: new Date('2024-02-05'),
        status: 'under_investigation',
        officerInCharge: adminUser._id,
        victims: [{
          name: 'Community at Large',
          gender: 'other',
          contact: 'N/A',
          address: 'Springfield Community'
        }],
        priority: 'critical'
      }
    ];

    const createdCrimes = await Crime.insertMany(crimes);
    console.log(`✅ Created ${createdCrimes.length} sample crimes`);

    // Link criminals to crimes
    for (let i = 0; i < Math.min(createdCriminals.length, createdCrimes.length); i++) {
      if (createdCrimes[i].suspects.length > 0) {
        createdCriminals[i].crimeRecords.push(createdCrimes[i]._id);
        await createdCriminals[i].save();
      }
    }

    console.log('✅ Sample data loaded successfully!');
    console.log('📊 Your system now has realistic police data');

  } catch (error) {
    console.error('❌ Error creating sample data:', error.message);
  }
};

createSampleData();