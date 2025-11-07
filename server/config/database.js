const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('🔌 Connecting to MongoDB database...');

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log('💾 Your data will now persist permanently!');

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n🔧 Connection details:');
    console.log('   Check your MONGODB_URI in .env file');
    console.log('   Ensure database server is accessible');
    console.log('   Verify username and password are correct');
    process.exit(1);
  }
};

module.exports = connectDB;