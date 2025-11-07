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

async function createSampleData() {
  try {
    console.log('🚨 Creating sample crime data...\n');
    
    // Login as admin to get token
    console.log('1. Logging in as admin...');
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
    
    // Create sample crimes
    console.log('\n2. Creating sample crimes...');
    
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
        date: '2024-01-15',
        status: 'under_investigation',
        officerInCharge: userId,
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
        date: '2024-01-20',
        status: 'open',
        officerInCharge: userId,
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
        date: '2024-01-25',
        status: 'closed',
        officerInCharge: userId,
        victims: [{
          name: 'Lisa Chen',
          age: 38,
          gender: 'female',
          contact: '555-0104',
          address: '567 Digital Avenue, Springfield, IL'
        }],
        priority: 'critical'
      }
    ];
    
    let successCount = 0;
    
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
          console.log(`✅ Created: ${crime.title}`);
          successCount++;
        } else {
          console.log(`❌ Failed: ${crime.title}`);
        }
      } catch (error) {
        console.log(`❌ Error creating ${crime.title}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Created ${successCount} sample crimes!`);
    console.log('\n🌐 Your system is now ready with sample data!');
    console.log('📍 Go to: http://localhost:8082');
    console.log('👤 Login: admin@police.gov / admin123');
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error.message);
  }
}

createSampleData();