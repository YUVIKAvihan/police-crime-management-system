const http = require('http');

// Function to make HTTP requests
function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(responseData);
          resolve({ statusCode: res.statusCode, data: response });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      if (typeof data === 'string') {
        req.write(data);
      } else {
        req.write(JSON.stringify(data));
      }
    }
    req.end();
  });
}

async function createFullSampleData() {
  try {
    console.log('🚀 Creating comprehensive sample data...\n');

    // Login as admin to get token
    console.log('1. 🔐 Logging in as admin...');
    const loginData = {
      email: 'admin@police.gov',
      password: 'admin123'
    };

    const loginOptions = {
      hostname: 'localhost',
      port: 5001,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    const loginResult = await makeRequest(loginOptions, loginData);
    if (loginResult.statusCode !== 200) {
      console.log('❌ Failed to login as admin');
      return;
    }

    const token = loginResult.data.token;
    const userId = loginResult.data.user.id;
    console.log('✅ Admin login successful!');

    // Create criminals first
    console.log('\n2. 👥 Creating criminal profiles...');

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
        previousCrimes: ['Theft (2019)', 'Burglary (2020)', 'Assault (2018)'],
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
        previousCrimes: ['Credit Card Fraud (2021)', 'Identity Theft (2020)'],
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
        previousCrimes: ['Drug Possession (2019)', 'Vandalism (2017)', 'Disorderly Conduct (2016)'],
        identificationMarks: 'Multiple tattoos on both arms, pierced ears',
        status: 'active'
      },
      {
        name: 'Sarah Mitchell',
        age: 31,
        gender: 'female',
        address: {
          street: '321 Maple Drive',
          city: 'Springfield',
          state: 'Illinois',
          zipCode: '62704',
          country: 'USA'
        },
        previousCrimes: ['Shoplifting (2020)', 'Trespassing (2019)'],
        identificationMarks: 'Small scar above left eyebrow',
        status: 'active'
      },
      {
        name: 'Michael Brown',
        age: 39,
        gender: 'male',
        address: {
          street: '654 Cedar Lane',
          city: 'Springfield',
          state: 'Illinois',
          zipCode: '62705',
          country: 'USA'
        },
        previousCrimes: ['Armed Robbery (2018)', 'Assault with Deadly Weapon (2017)'],
        identificationMarks: 'Bullet scar on left shoulder, tribal tattoo on back',
        status: 'imprisoned'
      }
    ];

    const createdCriminals = [];

    for (let i = 0; i < criminals.length; i++) {
      const criminal = criminals[i];

      const options = {
        hostname: 'localhost',
        port: 5001,
        path: '/api/criminals',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const result = await makeRequest(options, criminal);
        if (result.statusCode === 201) {
          console.log(`✅ Created criminal: ${criminal.name}`);
          createdCriminals.push(result.data.criminal);
        } else {
          console.log(`❌ Failed to create criminal: ${criminal.name}`);
        }
      } catch (error) {
        console.log(`❌ Error creating criminal ${criminal.name}:`, error.message);
      }
    }

    // Create more comprehensive crimes
    console.log('\n3. 🚨 Creating detailed crime records...');

    const crimes = [
      {
        title: 'Downtown Bank Robbery - First National',
        type: 'robbery',
        description: 'Armed robbery at First National Bank. Three masked suspects entered the bank at approximately 2:30 PM, demanded money from tellers at gunpoint, and fled the scene in a stolen black sedan. Approximately $45,000 was stolen. Security cameras captured partial footage of the suspects.',
        location: {
          address: '100 Main Street',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: '2024-01-15',
        status: 'under_investigation',
        officerInCharge: userId,
        suspects: createdCriminals.length > 0 ? [createdCriminals[0]._id] : [],
        victims: [{
          name: 'Jennifer Adams',
          age: 32,
          gender: 'female',
          contact: '555-0101',
          address: '789 Elm Street, Springfield, IL'
        }, {
          name: 'Mark Johnson',
          age: 45,
          gender: 'male',
          contact: '555-0102',
          address: '456 Oak Avenue, Springfield, IL'
        }],
        priority: 'high'
      },
      {
        title: 'Residential Burglary - Oak Street',
        type: 'burglary',
        description: 'Break-in reported at residential property. Multiple items stolen including electronics, jewelry, and cash totaling approximately $8,000. No signs of forced entry, suggesting perpetrator had access to keys or security codes. Neighbors reported seeing suspicious activity around 3 AM.',
        location: {
          address: '234 Oak Street',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: '2024-01-20',
        status: 'open',
        officerInCharge: userId,
        suspects: createdCriminals.length > 1 ? [createdCriminals[1]._id] : [],
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
        title: 'Cybercrime - Identity Theft Ring',
        type: 'cybercrime',
        description: 'Large-scale identity theft operation discovered. Victims reported unauthorized access to bank accounts, credit cards, and personal information. Investigation revealed sophisticated phishing scheme targeting local residents through fake banking websites. Over 50 victims identified with total losses exceeding $200,000.',
        location: {
          address: '567 Digital Avenue',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: '2024-01-25',
        status: 'closed',
        officerInCharge: userId,
        suspects: createdCriminals.length > 2 ? [createdCriminals[2]._id] : [],
        victims: [{
          name: 'Lisa Chen',
          age: 38,
          gender: 'female',
          contact: '555-0104',
          address: '567 Digital Avenue, Springfield, IL'
        }, {
          name: 'Robert Taylor',
          age: 52,
          gender: 'male',
          contact: '555-0105',
          address: '890 Tech Street, Springfield, IL'
        }],
        priority: 'critical'
      },
      {
        title: 'Assault at Downtown Bar - Murphy\'s Pub',
        type: 'assault',
        description: 'Physical altercation at Murphy\'s Bar resulted in serious injuries. Suspect attacked victim with a broken bottle during argument over sports game. Victim sustained lacerations requiring 15 stitches. Multiple witnesses present. Suspect fled scene before police arrival.',
        location: {
          address: '123 Bar Street',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: '2024-02-01',
        status: 'under_investigation',
        officerInCharge: userId,
        suspects: createdCriminals.length > 3 ? [createdCriminals[3]._id] : [],
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
        title: 'Drug Trafficking Operation - Warehouse District',
        type: 'drug_offense',
        description: 'Multi-month investigation uncovered large-scale drug trafficking operation. Search warrant executed at warehouse revealed 50 pounds of cocaine, 20 pounds of heroin, and $150,000 in cash. Three suspects arrested on scene. Investigation ongoing to identify additional network members.',
        location: {
          address: '999 Warehouse District',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: '2024-02-05',
        status: 'under_investigation',
        officerInCharge: userId,
        suspects: createdCriminals.length > 4 ? [createdCriminals[4]._id] : [],
        victims: [{
          name: 'Community at Large',
          gender: 'other',
          contact: 'N/A',
          address: 'Springfield Community'
        }],
        priority: 'critical'
      },
      {
        title: 'Vehicle Theft Ring - Luxury Cars',
        type: 'theft',
        description: 'Organized vehicle theft ring targeting luxury cars in upscale neighborhoods. 12 vehicles stolen over 2-week period, total value exceeding $500,000. Suspects use sophisticated methods to bypass security systems. Some vehicles recovered at chop shop operation.',
        location: {
          address: '456 Luxury Lane',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: '2024-02-08',
        status: 'open',
        officerInCharge: userId,
        suspects: [],
        victims: [{
          name: 'Patricia Williams',
          age: 41,
          gender: 'female',
          contact: '555-0107',
          address: '456 Luxury Lane, Springfield, IL'
        }],
        priority: 'high'
      },
      {
        title: 'Vandalism at City Park - Graffiti Damage',
        type: 'vandalism',
        description: 'Extensive graffiti damage to playground equipment, benches, and restroom facilities at Central Park. Estimated repair costs of $15,000. Security cameras captured footage of three juveniles. Community members reported ongoing issues with vandalism in the area.',
        location: {
          address: '100 Park Avenue',
          city: 'Springfield',
          state: 'Illinois'
        },
        date: '2024-02-10',
        status: 'closed',
        officerInCharge: userId,
        suspects: [],
        victims: [{
          name: 'Springfield Parks Department',
          gender: 'other',
          contact: '555-PARK',
          address: 'City Hall, Springfield, IL'
        }],
        priority: 'low'
      }
    ];

    let crimeSuccessCount = 0;

    for (let i = 0; i < crimes.length; i++) {
      const crime = crimes[i];

      const options = {
        hostname: 'localhost',
        port: 5001,
        path: '/api/crimes',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const result = await makeRequest(options, crime);
        if (result.statusCode === 201) {
          console.log(`✅ Created crime: ${crime.title}`);
          crimeSuccessCount++;
        } else {
          console.log(`❌ Failed to create crime: ${crime.title}`);
        }
      } catch (error) {
        console.log(`❌ Error creating crime ${crime.title}:`, error.message);
      }
    }

    console.log('\n🎉 Sample data creation completed!');
    console.log(`✅ Created ${createdCriminals.length} criminals`);
    console.log(`✅ Created ${crimeSuccessCount} crimes`);
    console.log('\n🌐 Your Police Management System is fully loaded!');
    console.log('📍 Go to: http://localhost:8081');
    console.log('👤 Login: admin@police.gov / admin123');
    console.log('\n📊 You now have:');
    console.log('   • Comprehensive crime records with suspects');
    console.log('   • Criminal profiles with detailed backgrounds');
    console.log('   • Various crime types and statuses');
    console.log('   • Multiple victims per case');
    console.log('   • Professional police data');

  } catch (error) {
    console.error('❌ Error creating sample data:', error.message);
  }
}

createFullSampleData();