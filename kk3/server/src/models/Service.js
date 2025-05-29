const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: Array,
      required: true,
      validate: {
        validator: function(v) {
          return v && v.length >= 1 && v.length <= 2;
        },
        message: 'Service must have 1 or 2 images'
      }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: false,
    },
    serviceType: {
      type: String,
      enum: ["Basic Shop", "Contact Now"],
      default: "Basic Shop",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries
serviceSchema.index({ category: 1 });
serviceSchema.index({ status: 1 });
serviceSchema.index({ serviceName: 'text', description: 'text' });

module.exports = mongoose.model("Service", serviceSchema);
