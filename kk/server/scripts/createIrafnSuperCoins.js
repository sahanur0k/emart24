const mongoose = require("mongoose");
const userModel = require("../models/users");
require("dotenv").config();

// Connect to MongoDB using the same connection as the app
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

async function createIrafnSuperCoins() {
  try {
    console.log("🔍 Finding Irafn user...");

    const irafnUser = await userModel.findOne({ email: "irafn@hayroo.com" });

    if (!irafnUser) {
      console.log("❌ Irafn user not found");
      process.exit(1);
    }

    console.log("✅ Irafn user found:", irafnUser._id);

    // Check if super coins already exist in user history
    const existingHistory = irafnUser.history || [];

    if (existingHistory.length > 0) {
      console.log(`📊 Irafn already has ${existingHistory.length} super coin transactions`);

      // Calculate total
      let total = 0;
      existingHistory.forEach(entry => {
        if (entry.type === 'earned') {
          total += entry.amount;
        } else if (entry.type === 'spent') {
          total -= entry.amount;
        }
      });

      console.log(`💰 Total super coins: ${total}`);
      console.log("✅ Super coins already exist for Irafn");
    } else {
      console.log("🪙 Creating sample super coins for Irafn...");

      const sampleCoins = [
        {
          amount: 150,
          type: "earned",
          description: "Welcome bonus for Irafn",
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
        },
        {
          amount: 75,
          type: "earned",
          description: "Order #IRAFN001 delivered - Electronics purchase",
          orderId: "IRAFN001",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        },
        {
          amount: 30,
          type: "earned",
          description: "Order #IRAFN002 delivered - Book purchase",
          orderId: "IRAFN002",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
          amount: 20,
          type: "spent",
          description: "Discount applied on order #IRAFN003",
          orderId: "IRAFN003",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        }
      ];

      // Add to user's history
      irafnUser.history = sampleCoins;
      await irafnUser.save();

      console.log("✅ Sample super coins created!");
      console.log("💰 Total super coins: 235 (150 + 75 + 30 - 20)");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createIrafnSuperCoins();
