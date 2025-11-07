const http = require('http');

async function testCrimeCreation() {
  try {
    console.log('🔍 Testing crime creation...');

    // First, login to get token
    console.log('1. Logging in...');
    const loginData = JSON.stringify({
      email: 'admin@police.gov',
      password: 'admin123'
    });

    const loginOptions = {
      hostname: 'localhost',
      port: 5001,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    };

    const loginResult = await makeRequest(loginOptions, loginData);

    if (loginResult.statusCode !== 200) {
      console.log('❌ Login failed:', loginResult.data);
      return;
    }

    const token = loginResult.data.token;
    console.log('✅ Login successful');

    // Now try to create a crime
    console.log('2. Creating crime...');
    const crimeData = JSON.stringify({
      title: 'Test Crime Case',
      type: 'theft',
      description: 'This is a test crime case to debug the creation process.',
      location: {
        address: '123 Test Street',
        city: 'Springfield',
        state: 'Illinois'
      },
      date: '2024-01-15',
      status: 'open',
      victims: [{
        name: 'Test Victim',
        age: 30,
        gender: 'male',
        contact: '555-0123',
        address: '123 Test Street'
      }],
      priority: 'medium'
    });

    const crimeOptions = {
      hostname: 'localhost',
      port: 5001,
      path: '/api/crimes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(crimeData)
      }
    };

    const crimeResult = await makeRequest(crimeOptions, crimeData);

    if (crimeResult.statusCode === 201) {
      console.log('✅ Crime created successfully!');
      console.log('Crime ID:', crimeResult.data.crime._id);
    } else {
      console.log('❌ Crime creation failed');
      console.log('Status:', crimeResult.statusCode);
      console.log('Response:', crimeResult.data);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

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
      req.write(data);
    }
    req.end();
  });
}

testCrimeCreation();