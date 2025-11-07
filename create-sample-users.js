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
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function createUsers() {
  console.log('👮 Creating sample users...\n');
  
  try {
    // Create officer user
    console.log('1. Creating officer user...');
    const officerData = {
      name: 'John Smith',
      email: 'john.smith@police.gov',
      password: 'officer123',
      role: 'officer',
      station: 'Downtown Police Station',
      badgeNumber: 'OFF001'
    };
    
    const officerOptions = {
      hostname: 'localhost',
      port: 5001,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    
    const officerResult = await makeRequest(officerOptions, officerData);
    if (officerResult.statusCode === 201) {
      console.log('✅ Officer user created successfully!');
    } else {
      console.log('ℹ️  Officer user may already exist');
    }
    
    console.log('\n✅ User creation completed!');
    console.log('\n🌐 Your Police Management System is ready!');
    console.log('📍 Go to: http://localhost:8082');
    console.log('\n👤 Login credentials:');
    console.log('   Admin: admin@police.gov / admin123');
    console.log('   Officer: john.smith@police.gov / officer123');
    
  } catch (error) {
    console.error('❌ Error creating users:', error.message);
  }
}

createUsers();