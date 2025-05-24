const userModel = require("../models/users");

class SuperCoin {
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
}

const superCoinController = new SuperCoin();
module.exports = superCoinController;
