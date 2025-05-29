const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('../models/users');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

async function createSimpleAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await userModel.findOne({ email: 'admin@hayroo.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists with email: admin@hayroo.com');
      console.log('Name:', existingAdmin.name);
      console.log('Role:', existingAdmin.userRole);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const adminUser = new userModel({
      name: 'Admin User',
      email: 'admin@hayroo.com',
      password: hashedPassword,
      userRole: 1, // 1 = admin
      phoneNumber: '1234567890',
      history: []
    });

    await adminUser.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@hayroo.com');
    console.log('Password: admin123');
    console.log('Role: 1 (admin)');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    mongoose.disconnect();
  }
}

createSimpleAdmin();
