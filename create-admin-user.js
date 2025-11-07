const http = require('http');

const adminData = JSON.stringify({
  name: 'Admin User',
  email: 'admin@police.gov',
  password: 'admin123',
  role: 'admin',
  station: 'Central Police Station',
  badgeNumber: 'ADM001'
});

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(adminData)
  }
};

console.log('🔐 Creating admin user...');

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (res.statusCode === 201) {
        console.log('✅ Admin user created successfully!');
        console.log('✅ You can now login with:');
        console.log('   Email: admin@police.gov');
        console.log('   Password: admin123');
      } else if (response.message && response.message.includes('already exists')) {
        console.log('✅ Admin user already exists!');
        console.log('✅ You can login with:');
        console.log('   Email: admin@police.gov');
        console.log('   Password: admin123');
      } else {
        console.log('❌ Error:', response.message || 'Unknown error');
      }
    } catch (error) {
      console.log('❌ Error parsing response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error creating admin user:', error.message);
  console.log('Make sure the backend server is running on port 5001');
});

req.write(adminData);
req.end();