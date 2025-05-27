const mongoose = require("mongoose");
const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Connect to MongoDB using the same connection as the app
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

async function createIrafnUser() {
  try {
    console.log("🔍 Checking for existing users...");

    // List all users
    const allUsers = await userModel.find({}).select("name email _id");
    console.log("📋 Existing users:");
    allUsers.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ID: ${user._id}`);
    });

    // Check if Irafn user exists
    const existingIrafn = await userModel.findOne({
      $or: [
        { email: "irafn@hayroo.com" },
        { name: "Irafn" }
      ]
    });

    if (existingIrafn) {
      console.log("✅ Irafn user already exists:");
      console.log("   Name:", existingIrafn.name);
      console.log("   Email:", existingIrafn.email);
      console.log("   ID:", existingIrafn._id);
    } else {
      console.log("🆕 Creating Irafn user...");

      // Create Irafn user
      const hashedPassword = bcrypt.hashSync("irafn123", 10);
      const newUser = new userModel({
        name: "Irafn",
        email: "irafn@hayroo.com",
        password: hashedPassword,
        userRole: 0 // Regular user
      });

      const savedUser = await newUser.save();
      console.log("✅ Irafn user created successfully:");
      console.log("   Name:", savedUser.name);
      console.log("   Email:", savedUser.email);
      console.log("   ID:", savedUser._id);
      console.log("   Password: irafn123");

      // Also create some sample super coins for Irafn
      console.log("🪙 Creating sample super coins for Irafn...");
      const SuperCoin = require("../models/SuperCoin");

      const sampleCoins = [
        {
          userId: savedUser._id,
          amount: 100,
          type: "earned",
          description: "Welcome bonus for new user",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
        },
        {
          userId: savedUser._id,
          amount: 50,
          type: "earned",
          description: "Order #IRAFN001 delivered - Product purchase",
          orderId: "IRAFN001",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        },
        {
          userId: savedUser._id,
          amount: 25,
          type: "earned",
          description: "Order #IRAFN002 delivered - Product purchase",
          orderId: "IRAFN002",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        }
      ];

      await SuperCoin.insertMany(sampleCoins);
      console.log("✅ Sample super coins created! Total: 175 coins");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createIrafnUser();
