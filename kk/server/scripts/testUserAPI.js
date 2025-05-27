const mongoose = require("mongoose");
const userModel = require("../models/users");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

async function testUserAPI() {
  try {
    console.log("🔍 Testing User API...");

    // Find the Irafn user
    const irafnUser = await userModel.findOne({ email: "irafn@hayroo.com" });
    
    if (!irafnUser) {
      console.log("❌ Irafn user not found!");
      return;
    }

    console.log("✅ Found Irafn user:");
    console.log("   ID:", irafnUser._id);
    console.log("   Name:", irafnUser.name);
    console.log("   Email:", irafnUser.email);

    // Test the getUserById function directly
    console.log("\n🧪 Testing getUserById function...");
    
    const testUser = await userModel
      .findById(irafnUser._id)
      .select("name email phoneNumber userImage updatedAt createdAt");
    
    if (testUser) {
      console.log("✅ getUserById test successful:");
      console.log("   Response:", testUser);
    } else {
      console.log("❌ getUserById test failed - no user returned");
    }

    // Test with a sample JWT payload
    console.log("\n🔑 Sample JWT payload for testing:");
    console.log({
      token: "sample-jwt-token",
      user: {
        _id: irafnUser._id,
        role: irafnUser.userRole
      }
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

testUserAPI();
