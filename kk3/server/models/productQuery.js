const mongoose = require("mongoose");

const productQuerySchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerContact: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    urgency: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    estimatedPrice: {
      type: Number,
      min: 0,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Ordered", "Available", "Rejected"],
      default: "Pending",
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    adminNotes: {
      type: String,
      trim: true,
    },
    expectedDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
productQuerySchema.index({ status: 1, createdAt: -1 });
productQuerySchema.index({ employeeId: 1 });

module.exports = mongoose.model("ProductQuery", productQuerySchema);
