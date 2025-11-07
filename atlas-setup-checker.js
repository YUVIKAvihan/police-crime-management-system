const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

async function testAtlasConnection() {
  try {
    console.log('🔍 Testing MongoDB Atlas connection...');
    console.log('📍 Connection URI:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('🌐 Your database is now persistent and cloud-based');
    
    // Test creating a document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ test: 'Atlas connection successful!' });
    await testDoc.save();
    console.log('✅ Test document created successfully');
    
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document cleaned up');
    
    await mongoose.connection.close();
    console.log('✅ Connection test completed successfully!');
    
    console.log('\n🎉 MongoDB Atlas is ready!');
    console.log('💾 Your login credentials and crime data will now persist forever');
    console.log('🚀 Restart your server to start using Atlas');
    
  } catch (error) {
    console.error('❌ Atlas connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your connection string format');
    console.log('2. Verify username and password are correct');
    console.log('3. Ensure network access is configured (0.0.0.0/0)');
    console.log('4. Confirm database user has proper permissions');
  }
}

testAtlasConnection();