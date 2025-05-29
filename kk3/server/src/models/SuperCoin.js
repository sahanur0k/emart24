const mongoose = require("mongoose");

const superCoinSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    history: [
      {
        amount: Number,
        type: {
          type: String,
          enum: ["earned", "spent"],
        },
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperCoin", superCoinSchema); 