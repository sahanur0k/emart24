const mongoose = require('mongoose');
const Product = require('../models/products');

// Replace with your MongoDB connection string
const MONGO_URI = 'mongodb+srv://sahanur:oUIfDpSlXPLSHo97@test.l0luh7l.mongodb.net/?retryWrites=true&w=majority&appName=test';

async function updateSuperCoinReward() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const result = await Product.updateMany(
      { pSuperCoinReward: { $exists: false } },
      { $set: { pSuperCoinReward: 0 } }
    );
    console.log(`Updated ${result.nModified} products.`);
    mongoose.disconnect();
  } catch (err) {
    console.error('Error updating products:', err);
    mongoose.disconnect();
  }
}

updateSuperCoinReward(); 