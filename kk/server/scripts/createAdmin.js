const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('../models/users');
require('dotenv').config();

// Connect to database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await userModel.findOne({ userRole: 1 });
    
    if (existingAdmin) {
      console.log('Admin user already exists:');
      console.log('Email:', existingAdmin.email);
      console.log('Name:', existingAdmin.name);
      mongoose.disconnect();
      return;
    }

    // Create admin user
    const adminData = {
      name: 'Admin',
      email: 'admin@hayroo.com',
      password: bcrypt.hashSync('admin123', 10),
      userRole: 1 // Admin role
    };

    const admin = new userModel(adminData);
    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@hayroo.com');
    console.log('🔑 Password: admin123');
    console.log('');
    console.log('You can now login to the admin panel with these credentials.');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
