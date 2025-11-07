const http = require('http');
const FormData = require('form-data');

async function testFrontendCrimeCreation() {
  try {
    console.log('🔍 Testing frontend-style crime creation...');

    // First, login to get token
    console.log('1. Logging in...');
    const loginData = JSON.stringify({
      email: 'admin@police.gov',
      password: 'admin123'
    });

    const loginResult = await makeJSONRequest({
      hostname: 'localhost',
      port: 5001,
      path: '/api/auth/login',
      method: 'POST'
    }, loginData);

    if (loginResult.statusCode !== 200) {
      console.log('❌ Login failed:', loginResult.data);
      return;
    }

    const token = loginResult.data.token;
    console.log('✅ Login successful');

    // Now try to create a crime using FormData (like frontend)
    console.log('2. Creating crime with FormData...');

    const form = new FormData();
    form.append('title', 'Frontend Test Crime');
    form.append('type', 'theft');
    form.append('description', 'This is a test crime created using FormData like the frontend does.');
    form.append('location[address]', '456 Frontend Street');
    form.append('location[city]', 'Springfield');
    form.append('location[state]', 'Illinois');
    form.append('date', '2024-01-20');
    form.append('priority', 'medium');

    // Add victims as JSON string (like frontend does)
    const victims = [{
      name: 'Frontend Test Victim',
      age: 25,
      gender: 'female',
      contact: '555-0456',
      address: '456 Frontend Street'
    }];
    form.append('victims', JSON.stringify(victims));

    const formResult = await makeFormDataRequest({
      hostname: 'localhost',
      port: 5001,
      path: '/api/crimes',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      }
    }, form);

    if (formResult.statusCode === 201) {
      console.log('✅ Frontend-style crime created successfully!');
      console.log('Crime ID:', formResult.data.crime._id);
      console.log('Victims:', formResult.data.crime.victims);
    } else {
      console.log('❌ Frontend-style crime creation failed');
      console.log('Status:', formResult.statusCode);
      console.log('Response:', formResult.data);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

function makeJSONRequest(options, data) {
  return new Promise((resolve, reject) => {
    options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    };

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
    req.write(data);
    req.end();
  });
}

function makeFormDataRequest(options, form) {
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
    form.pipe(req);
  });
}

testFrontendCrimeCreation();