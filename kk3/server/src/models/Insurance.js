const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema(
  {
    insuranceName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    insuranceType: {
      type: String,
      required: true,
      enum: ["Health", "Life", "Auto", "Home", "Travel", "Business", "Other"],
      default: "Health",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
      required: true,
      enum: ["Monthly", "Quarterly", "Semi-Annual", "Annual", "One-time"],
      default: "Annual",
    },
    coverage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    features: [{
      type: String,
      trim: true,
      maxlength: 200,
    }],
    serviceType: {
      type: String,
      required: true,
      enum: ["Basic Shop", "Contact Now"],
      default: "Basic Shop",
    },
    images: [{
      type: String,
      required: false,
    }],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
insuranceSchema.index({ insuranceName: "text", description: "text", insuranceType: "text" });

module.exports = mongoose.model("Insurance", insuranceSchema);
