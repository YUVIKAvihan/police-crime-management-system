#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Crime Management System...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 14) {
  console.error('❌ Node.js version 14 or higher is required');
  console.error(`Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log('✅ Node.js version check passed');

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  process.chdir('server');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Check if .env file exists, create if not
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating .env file...');
  const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/crime-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created');
} else {
  console.log('✅ .env file already exists');
}

// Go back to root directory
process.chdir('..');

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  process.chdir('client');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Go back to root directory
process.chdir('..');

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Seed the database (optional): cd server && npm run seed');
console.log('3. Start the backend: cd server && npm run dev');
console.log('4. Start the frontend: cd client && npm run dev');
console.log('\n🌐 Access the application at: http://localhost:3000');
console.log('\n👤 Default admin login:');
console.log('   Email: admin@police.gov');
console.log('   Password: admin123');
console.log('\n📚 For more information, check the README.md file');