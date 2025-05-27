const mongoose = require("mongoose");

const rewardCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    coins: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    usedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries
rewardCodeSchema.index({ code: 1 });
rewardCodeSchema.index({ isUsed: 1 });
rewardCodeSchema.index({ expiryDate: 1 });

module.exports = mongoose.model("RewardCode", rewardCodeSchema);
