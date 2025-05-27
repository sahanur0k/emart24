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

async function testIrafnLogin() {
  try {
    console.log("🔍 Finding Irafn user...");
    
    const irafnUser = await userModel.findOne({ email: "irafn@hayroo.com" });
    
    if (!irafnUser) {
      console.log("❌ Irafn user not found");
      process.exit(1);
    }
    
    console.log("✅ Irafn user found:");
    console.log("   Name:", irafnUser.name);
    console.log("   Email:", irafnUser.email);
    console.log("   ID:", irafnUser._id);
    console.log("   Role:", irafnUser.userRole);
    
    // Test common passwords
    const testPasswords = ["irafn123", "password123", "irafn", "123456", "password"];
    
    console.log("\n🔐 Testing common passwords...");
    
    for (const password of testPasswords) {
      const isMatch = await bcrypt.compare(password, irafnUser.password);
      if (isMatch) {
        console.log(`✅ Password found: "${password}"`);
        console.log("\n🎯 Login credentials for Irafn:");
        console.log(`   Email: irafn@hayroo.com`);
        console.log(`   Password: ${password}`);
        process.exit(0);
      }
    }
    
    console.log("❌ None of the common passwords worked");
    console.log("🔧 Resetting password to 'irafn123'...");
    
    // Reset password
    const newHashedPassword = bcrypt.hashSync("irafn123", 10);
    await userModel.findByIdAndUpdate(irafnUser._id, { password: newHashedPassword });
    
    console.log("✅ Password reset successfully!");
    console.log("\n🎯 Login credentials for Irafn:");
    console.log("   Email: irafn@hayroo.com");
    console.log("   Password: irafn123");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

testIrafnLogin();
