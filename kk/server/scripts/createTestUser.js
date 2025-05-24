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

async function createTestUser() {
  try {
    // Check if test user already exists
    const existingUser = await userModel.findOne({ email: 'test@hayroo.com' });
    
    if (existingUser) {
      console.log('Test user already exists:');
      console.log('Email:', existingUser.email);
      console.log('Name:', existingUser.name);
      
      // Add some test super coin history
      if (!existingUser.history || existingUser.history.length === 0) {
        existingUser.history = [
          {
            amount: 50,
            type: "earned",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            description: "Order #12345 delivered - Welcome bonus"
          },
          {
            amount: 25,
            type: "earned", 
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            description: "Order #12346 delivered - Product purchase"
          },
          {
            amount: 10,
            type: "spent",
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            description: "Discount applied on order #12347"
          }
        ];
        await existingUser.save();
        console.log('✅ Added test super coin history!');
      }
      
      mongoose.disconnect();
      return;
    }

    // Create test user
    const userData = {
      name: 'Test User',
      email: 'test@hayroo.com',
      password: bcrypt.hashSync('test123', 10),
      userRole: 0, // Regular user role
      history: [
        {
          amount: 50,
          type: "earned",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          description: "Order #12345 delivered - Welcome bonus"
        },
        {
          amount: 25,
          type: "earned", 
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          description: "Order #12346 delivered - Product purchase"
        },
        {
          amount: 10,
          type: "spent",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          description: "Discount applied on order #12347"
        }
      ]
    };

    const user = new userModel(userData);
    await user.save();

    console.log('✅ Test user created successfully!');
    console.log('📧 Email: test@hayroo.com');
    console.log('🔑 Password: test123');
    console.log('💰 Super Coins: 65 (50 + 25 - 10)');
    console.log('');
    console.log('You can now login with these credentials to test Super Coins functionality.');
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    mongoose.disconnect();
  }
}

createTestUser();
