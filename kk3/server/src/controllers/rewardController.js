const SuperCoin = require("../models/SuperCoin");
const Order = require("../../models/orders");
const User = require("../../models/users");

exports.getRewards = async (req, res) => {
  try {
    const rewards = await SuperCoin.find()
      .populate("user", "name email")
      .populate("order")
      .sort({ createdAt: -1 });
    res.json({ rewards });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.updateRewardStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reward = await SuperCoin.findById(req.params.id);

    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }

    if (status === "approved") {
      // Add to user's super coin history
      const user = await User.findById(reward.user);
      if (!user.history) {
        user.history = [];
      }

      const historyEntry = {
        amount: reward.amount,
        type: "earned",
        date: new Date(),
        description: `Reward from order #${reward.order?._id?.toString().slice(-6) || "N/A"}`
      };

      user.history.push(historyEntry);
      await user.save();
    }

    reward.status = status;
    await reward.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.createReward = async (orderId, userId, amount) => {
  try {
    const reward = new SuperCoin({
      user: userId,
      order: orderId,
      amount,
      type: "earned",
      status: "pending",
    });
    await reward.save();
    return reward;
  } catch (error) {
    console.error("Error creating reward:", error);
    return null;
  }
};