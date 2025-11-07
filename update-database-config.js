const fs = require('fs');
const path = require('path');

function updateDatabaseConfig(connectionString) {
  try {
    console.log('🔧 Updating database configuration...');
    
    // Read current .env file
    const envPath = path.join(__dirname, 'server', '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace MongoDB URI
    const oldUri = /MONGODB_URI=.*/;
    const newUri = `MONGODB_URI=${connectionString}`;
    
    if (oldUri.test(envContent)) {
      envContent = envContent.replace(oldUri, newUri);
    } else {
      envContent += `\nMONGODB_URI=${connectionString}`;
    }
    
    // Write updated .env file
    fs.writeFileSync(envPath, envContent);
    
    console.log('✅ Database configuration updated successfully!');
    console.log('📍 MongoDB Atlas connection configured');
    console.log('💾 Your data will now persist permanently');
    console.log('\n🔄 Please restart your server to apply changes:');
    console.log('   1. Stop current server (Ctrl+C)');
    console.log('   2. Run: cd server && npm run dev');
    
    return true;
  } catch (error) {
    console.error('❌ Error updating configuration:', error.message);
    return false;
  }
}

// Example usage:
// updateDatabaseConfig('mongodb+srv://crimeadmin:password@crime-management.abc123.mongodb.net/crime-management');

module.exports = updateDatabaseConfig;

// If run directly with connection string as argument
if (require.main === module) {
  const connectionString = process.argv[2];
  if (connectionString) {
    updateDatabaseConfig(connectionString);
  } else {
    console.log('Usage: node update-database-config.js "your-connection-string"');
    console.log('Example: node update-database-config.js "mongodb+srv://user:pass@cluster.mongodb.net/crime-management"');
  }
}