const mongoose = require('mongoose');
const userModel = require('../models/users');
require('dotenv').config();

// Connect to database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

async function testSuperCoins() {
  try {
    // Find test user
    const testUser = await userModel.findOne({ email: 'test@hayroo.com' });
    
    if (!testUser) {
      console.log('❌ Test user not found. Please run createTestUser.js first.');
      mongoose.disconnect();
      return;
    }

    console.log('✅ Test user found:');
    console.log('ID:', testUser._id);
    console.log('Email:', testUser.email);
    console.log('Name:', testUser.name);
    console.log('History length:', testUser.history ? testUser.history.length : 0);
    
    if (testUser.history && testUser.history.length > 0) {
      console.log('\n📊 Super Coins History:');
      let totalCoins = 0;
      
      testUser.history.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry.type}: ${entry.amount} coins - ${entry.description}`);
        if (entry.type === 'earned') {
          totalCoins += entry.amount;
        } else if (entry.type === 'spent') {
          totalCoins -= entry.amount;
        }
      });
      
      console.log(`\n💰 Total Super Coins: ${totalCoins}`);
    } else {
      console.log('\n⚠️ No super coins history found.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

testSuperCoins();
