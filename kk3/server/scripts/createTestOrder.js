const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('../models/users');
const orderModel = require('../models/orders');
const productModel = require('../models/products');
require('dotenv').config();

// Connect to database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

async function createTestOrder() {
  try {
    // 1. Create a new test user
    const newUser = {
      name: 'Alice Cooper',
      email: 'alice@hayroo.com',
      password: bcrypt.hashSync('test123', 10),
      userRole: 0,
      history: []
    };

    let user = await userModel.findOne({ email: newUser.email });
    if (!user) {
      user = new userModel(newUser);
      await user.save();
      console.log('✅ Created new user: Alice Cooper (alice@hayroo.com)');
    } else {
      console.log('📧 User Alice Cooper already exists');
    }

    // 2. Get or create a test product with super coin rewards
    let product = await productModel.findOne({ pName: 'Test Product with Super Coins' });
    if (!product) {
      // Check if there are any existing products
      const existingProduct = await productModel.findOne();
      if (existingProduct) {
        product = existingProduct;
        console.log(`📦 Using existing product: ${product.pName}`);
      } else {
        console.log('❌ No products found. Please create products first through admin panel.');
        mongoose.disconnect();
        return;
      }
    }

    // 3. Create a test order
    const orderData = {
      allProduct: [
        {
          id: product._id,
          quantitiy: 2 // Note: there's a typo in the schema (quantitiy instead of quantity)
        }
      ],
      user: user._id,
      amount: product.pPrice * 2,
      transactionId: `TXN${Date.now()}`,
      address: '123 Test Street, Test City, Test State 12345',
      phone: 1234567890,
      status: 'Not processed'
    };

    const existingOrder = await orderModel.findOne({ 
      user: user._id,
      transactionId: orderData.transactionId 
    });

    if (!existingOrder) {
      const order = new orderModel(orderData);
      await order.save();
      
      // Calculate super coins for this order
      const superCoins = (product.pSuperCoinReward || 0) * 2;
      
      console.log('✅ Created test order:');
      console.log(`   📧 User: ${user.name} (${user.email})`);
      console.log(`   📦 Product: ${product.pName}`);
      console.log(`   💰 Amount: $${orderData.amount}`);
      console.log(`   🥇 Potential Super Coins: ${superCoins}`);
      console.log(`   📋 Status: ${orderData.status}`);
      console.log(`   🆔 Order ID: ${order._id}`);
      console.log('');
      console.log('🔄 Next Steps:');
      console.log('1. Login as admin: sahanuralam.san@gmail.com / admin123');
      console.log('2. Go to Orders section to see this order');
      console.log('3. Change status to "Delivered" to award super coins');
      console.log('4. Check Rewards section to see updated user balance');
    } else {
      console.log('📋 Test order already exists for this user');
    }

  } catch (error) {
    console.error('❌ Error creating test order:', error);
  } finally {
    mongoose.disconnect();
  }
}

createTestOrder();
