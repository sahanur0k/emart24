const User = require("../../models/users");
const RewardCode = require("../models/RewardCode");

// Get all users with their super coin balances
exports.getAllUsersWithSuperCoins = async (req, res) => {
  try {
    const users = await User.find({}, "name email history").sort({ name: 1 });

    const usersWithCoins = users.map(user => {
      // Calculate total super coins from history
      let totalSuperCoins = 0;
      const history = user.history || [];

      history.forEach(entry => {
        if (entry.type === "earned") {
          totalSuperCoins += entry.amount;
        } else if (entry.type === "spent") {
          totalSuperCoins -= entry.amount;
        }
      });

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        totalSuperCoins: Math.max(0, totalSuperCoins) // Ensure non-negative
      };
    });

    res.json({ users: usersWithCoins });
  } catch (error) {
    console.error("Error fetching users with super coins:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Update user super coins (add or remove)
exports.updateUserSuperCoins = async (req, res) => {
  try {
    const { userId, action, amount } = req.body;

    if (!userId || !action || !amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    if (!["add", "remove"].includes(action)) {
      return res.status(400).json({ error: "Action must be 'add' or 'remove'" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate current balance
    let currentBalance = 0;
    const history = user.history || [];

    history.forEach(entry => {
      if (entry.type === "earned") {
        currentBalance += entry.amount;
      } else if (entry.type === "spent") {
        currentBalance -= entry.amount;
      }
    });

    // Check if removing more than available
    if (action === "remove" && currentBalance < amount) {
      return res.status(400).json({ error: "Insufficient super coins to remove" });
    }

    // Add entry to history
    const historyEntry = {
      amount: amount,
      type: action === "add" ? "earned" : "spent",
      date: new Date(),
      description: action === "add"
        ? `Admin added ${amount} super coins`
        : `Admin removed ${amount} super coins`
    };

    user.history.push(historyEntry);
    await user.save();

    const newBalance = action === "add"
      ? currentBalance + amount
      : currentBalance - amount;

    res.json({
      success: true,
      message: `Successfully ${action === "add" ? "added" : "removed"} ${amount} super coins`,
      newBalance: Math.max(0, newBalance)
    });
  } catch (error) {
    console.error("Error updating user super coins:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Create reward code
exports.createRewardCode = async (req, res) => {
  try {
    const { code, coins, description, expiryDate } = req.body;

    if (!code || !coins || !description) {
      return res.status(400).json({ error: "Code, coins, and description are required" });
    }

    if (coins <= 0) {
      return res.status(400).json({ error: "Coins must be greater than 0" });
    }

    // Check if code already exists
    const existingCode = await RewardCode.findOne({ code: code.toUpperCase() });
    if (existingCode) {
      return res.status(400).json({ error: "Reward code already exists" });
    }

    const rewardCode = new RewardCode({
      code: code.toUpperCase(),
      coins,
      description,
      expiryDate: expiryDate || null,
      createdBy: req.body.loggedInUserId // Using the existing auth pattern
    });

    await rewardCode.save();

    res.json({
      success: true,
      message: "Reward code created successfully",
      code: rewardCode
    });
  } catch (error) {
    console.error("Error creating reward code:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get all reward codes
exports.getAllRewardCodes = async (req, res) => {
  try {
    const codes = await RewardCode.find({})
      .populate("usedBy", "name email")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json({ codes });
  } catch (error) {
    console.error("Error fetching reward codes:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Delete reward code
exports.deleteRewardCode = async (req, res) => {
  try {
    const { codeId } = req.params;

    const rewardCode = await RewardCode.findById(codeId);
    if (!rewardCode) {
      return res.status(404).json({ error: "Reward code not found" });
    }

    if (rewardCode.isUsed) {
      return res.status(400).json({ error: "Cannot delete a used reward code" });
    }

    await RewardCode.findByIdAndDelete(codeId);

    res.json({
      success: true,
      message: "Reward code deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting reward code:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
