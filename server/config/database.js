const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI;
    
    // If no MongoDB URI is provided or connection fails, use in-memory database
    if (!mongoURI || mongoURI.includes('localhost:27017')) {
      console.log('⚠️  MongoDB not available locally. Using in-memory database for demo...');
      
      // Try to use mongodb-memory-server for demo
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        mongoURI = mongod.getUri();
        console.log('✅ In-memory MongoDB started for demo');
      } catch (error) {
        console.log('📝 Install mongodb-memory-server for in-memory database:');
        console.log('   cd server && npm install mongodb-memory-server');
        console.log('   Or set up MongoDB Atlas for cloud database');
        throw error;
      }
    }
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n🔧 Quick fixes:');
    console.log('1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
    console.log('2. Use MongoDB Atlas (free): https://www.mongodb.com/atlas');
    console.log('3. Install in-memory DB: cd server && npm install mongodb-memory-server');
    process.exit(1);
  }
};

module.exports = connectDB;