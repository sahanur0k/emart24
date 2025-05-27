const Order = require("../models/Order");
const Product = require("../models/Product");
const { createReward } = require("./rewardController");

exports.createOrder = async (req, res) => {
  try {
    const { allProduct, user, amount, address, phone, paymentType } = req.body;

    // Calculate total super coins for the order
    let totalSuperCoins = 0;
    for (const product of allProduct) {
      const productDetails = await Product.findById(product._id);
      if (productDetails && productDetails.pSuperCoinReward) {
        totalSuperCoins += productDetails.pSuperCoinReward * product.quantity;
      }
    }

    const order = new Order({
      allProduct,
      user,
      amount,
      address,
      phone,
      paymentType,
    });

    const savedOrder = await order.save();

    // Create super coin reward if there are any coins to be awarded
    if (totalSuperCoins > 0) {
      await createReward(savedOrder._id, user, totalSuperCoins);
    }

    res.json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
}; 