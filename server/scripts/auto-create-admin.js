const User = require('../models/User');

const createDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@police.gov' });
    
    if (!existingAdmin) {
      console.log('🔐 Creating default admin user...');
      
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@police.gov',
        password: 'admin123',
        role: 'admin',
        station: 'Central Police Station',
        badgeNumber: 'ADM001'
      });
      
      await adminUser.save();
      console.log('✅ Default admin user created successfully!');
      console.log('   Email: admin@police.gov');
      console.log('   Password: admin123');
      
      // Also create officer user
      const officerUser = new User({
        name: 'John Smith',
        email: 'john.smith@police.gov',
        password: 'officer123',
        role: 'officer',
        station: 'Downtown Police Station',
        badgeNumber: 'OFF001'
      });
      
      await officerUser.save();
      console.log('✅ Default officer user created successfully!');
      console.log('   Email: john.smith@police.gov');
      console.log('   Password: officer123');
      
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default users:', error.message);
  }
};

module.exports = createDefaultAdmin;