const userModel = require("../models/users");
const orderModel = require("../models/orders");

class SuperCoin {
  // Get user's pending super coins from undelivered orders
  async getPendingSuperCoins(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "User ID is required" });
    }

    try {
      // Get all orders for the user that are not delivered
      const pendingOrders = await orderModel.find({
        user: uId,
        status: { $ne: "Delivered" }
      }).populate("allProduct.id", "pName pSuperCoinReward");

      let totalPendingCoins = 0;
      const pendingOrderDetails = [];

      pendingOrders.forEach(order => {
        let orderPendingCoins = 0;
        order.allProduct.forEach(product => {
          if (product.id && product.id.pSuperCoinReward) {
            const coins = product.id.pSuperCoinReward * product.quantitiy;
            orderPendingCoins += coins;
          }
        });

        if (orderPendingCoins > 0) {
          totalPendingCoins += orderPendingCoins;
          pendingOrderDetails.push({
            orderId: order._id,
            status: order.status,
            pendingCoins: orderPendingCoins,
            createdAt: order.createdAt,
            products: order.allProduct.map(p => ({
              name: p.id.pName,
              quantity: p.quantitiy,
              superCoinReward: p.id.pSuperCoinReward
            }))
          });
        }
      });

      return res.json({
        totalPendingCoins,
        pendingOrders: pendingOrderDetails
      });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch pending super coins" });
    }
  }

  // Get user's super coin balance and history
  async getUserSuperCoins(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "User ID is required" });
    }

    try {
      const user = await userModel.findById(uId);
      if (!user) {
        return res.json({ error: "User not found" });
      }

      // Calculate total super coins from history
      let totalSuperCoins = 0;
      const superCoinHistory = user.history || [];

      superCoinHistory.forEach(entry => {
        if (entry.type === "earned") {
          totalSuperCoins += entry.amount;
        } else if (entry.type === "spent") {
          totalSuperCoins -= entry.amount;
        }
      });

      return res.json({
        totalSuperCoins,
        history: superCoinHistory.sort((a, b) => new Date(b.date) - new Date(a.date))
      });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch super coins" });
    }
  }

  // Spend super coins (for future use)
  async spendSuperCoins(req, res) {
    let { uId, amount, description } = req.body;
    if (!uId || !amount) {
      return res.json({ message: "User ID and amount are required" });
    }

    try {
      const user = await userModel.findById(uId);
      if (!user) {
        return res.json({ error: "User not found" });
      }

      // Calculate current balance
      let currentBalance = 0;
      const superCoinHistory = user.history || [];

      superCoinHistory.forEach(entry => {
        if (entry.type === "earned") {
          currentBalance += entry.amount;
        } else if (entry.type === "spent") {
          currentBalance -= entry.amount;
        }
      });

      if (currentBalance < amount) {
        return res.json({ error: "Insufficient super coins" });
      }

      // Add spending entry to history
      const spendEntry = {
        amount: amount,
        type: "spent",
        date: new Date(),
        description: description || "Super coins spent"
      };

      user.history.push(spendEntry);
      await user.save();

      return res.json({
        success: "Super coins spent successfully",
        newBalance: currentBalance - amount
      });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to spend super coins" });
    }
  }

  // Redeem reward code
  async redeemRewardCode(req, res) {
    let { uId, code } = req.body;
    if (!uId || !code) {
      return res.json({ message: "User ID and code are required" });
    }

    try {
      const RewardCode = require("../src/models/RewardCode");

      const user = await userModel.findById(uId);
      if (!user) {
        return res.json({ error: "User not found" });
      }

      // Find the reward code
      const rewardCode = await RewardCode.findOne({ code: code.toUpperCase() });
      if (!rewardCode) {
        return res.json({ error: "Invalid reward code" });
      }

      // Check if code is already used
      if (rewardCode.isUsed) {
        return res.json({ error: "This reward code has already been used" });
      }

      // Check if code is expired
      if (rewardCode.expiryDate && new Date() > rewardCode.expiryDate) {
        return res.json({ error: "This reward code has expired" });
      }

      // Add coins to user's history
      const earnEntry = {
        amount: rewardCode.coins,
        type: "earned",
        date: new Date(),
        description: `Reward code redeemed: ${rewardCode.description}`
      };

      user.history.push(earnEntry);
      await user.save();

      // Mark code as used
      rewardCode.isUsed = true;
      rewardCode.usedBy = uId;
      rewardCode.usedAt = new Date();
      await rewardCode.save();

      // Calculate new balance
      let newBalance = 0;
      const superCoinHistory = user.history || [];
      superCoinHistory.forEach(entry => {
        if (entry.type === "earned") {
          newBalance += entry.amount;
        } else if (entry.type === "spent") {
          newBalance -= entry.amount;
        }
      });

      return res.json({
        success: "Reward code redeemed successfully!",
        coinsEarned: rewardCode.coins,
        newBalance: newBalance,
        description: rewardCode.description
      });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to redeem reward code" });
    }
  }
}

const superCoinController = new SuperCoin();
module.exports = superCoinController;
