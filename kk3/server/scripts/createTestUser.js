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
    // Create multiple test users with different super coin balances
    const testUsers = [
      {
        name: 'John Smith',
        email: 'john@hayroo.com',
        password: bcrypt.hashSync('test123', 10),
        userRole: 0,
        history: [
          {
            amount: 100,
            type: "earned",
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            description: "Order #12001 delivered - Premium purchase"
          },
          {
            amount: 50,
            type: "earned",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            description: "Order #12002 delivered - Regular purchase"
          },
          {
            amount: 20,
            type: "spent",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            description: "Discount applied on order #12003"
          }
        ]
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@hayroo.com',
        password: bcrypt.hashSync('test123', 10),
        userRole: 0,
        history: [
          {
            amount: 75,
            type: "earned",
            date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
            description: "Order #12004 delivered - Electronics purchase"
          },
          {
            amount: 30,
            type: "earned",
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            description: "Order #12005 delivered - Fashion purchase"
          }
        ]
      },
      {
        name: 'Mike Wilson',
        email: 'mike@hayroo.com',
        password: bcrypt.hashSync('test123', 10),
        userRole: 0,
        history: [
          {
            amount: 200,
            type: "earned",
            date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            description: "Order #12006 delivered - Bulk purchase"
          },
          {
            amount: 50,
            type: "spent",
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            description: "Discount applied on order #12007"
          },
          {
            amount: 25,
            type: "earned",
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            description: "Order #12008 delivered - Accessories"
          }
        ]
      },
      {
        name: 'Emma Davis',
        email: 'emma@hayroo.com',
        password: bcrypt.hashSync('test123', 10),
        userRole: 0,
        history: [
          {
            amount: 40,
            type: "earned",
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            description: "Order #12009 delivered - Home goods"
          }
        ]
      }
    ];

    for (const userData of testUsers) {
      const existingUser = await userModel.findOne({ email: userData.email });

      if (existingUser) {
        console.log(`User ${userData.name} already exists`);
        continue;
      }

      const user = new userModel(userData);
      await user.save();

      // Calculate total coins for display
      let totalCoins = 0;
      userData.history.forEach(entry => {
        if (entry.type === "earned") {
          totalCoins += entry.amount;
        } else if (entry.type === "spent") {
          totalCoins -= entry.amount;
        }
      });

      console.log(`✅ Created user: ${userData.name} (${userData.email}) - ${totalCoins} super coins`);
    }

    console.log('');
    console.log('✅ Test users setup complete!');
    console.log('🔑 All users have password: test123');
    console.log('📧 Admin login: sahanuralam.san@gmail.com');
    console.log('');
    console.log('You can now view these users in the admin panel at /admin/dashboard/rewards');

  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    mongoose.disconnect();
  }
}

createTestUser();
