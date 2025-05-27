const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["earned", "spent"],
      default: "earned",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    description: {
      type: String,
      default: "Super coins from order",
    },
  },
  { timestamps: true }
);

// Index for faster queries
rewardSchema.index({ user: 1 });
rewardSchema.index({ order: 1 });
rewardSchema.index({ status: 1 });

module.exports = mongoose.model("Reward", rewardSchema);
