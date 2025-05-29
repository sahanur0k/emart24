const mongoose = require("mongoose");

const insuranceClientSchema = new mongoose.Schema(
  {
    policyNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    insuranceType: {
      type: String,
      required: true,
      enum: ["Health", "Life", "Auto", "Home", "Travel", "Business", "Other"],
    },
    policyDate: {
      type: Date,
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },
      city: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
      state: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
      zipCode: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
      },
      country: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        default: "USA",
      },
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    premium: {
      type: Number,
      required: true,
      min: 0,
    },
    coverage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    duration: {
      type: String,
      required: true,
      enum: ["Monthly", "Quarterly", "Semi-Annual", "Annual", "One-time"],
      default: "Annual",
    },
    status: {
      type: String,
      enum: ["Active", "Expired", "Cancelled", "Pending"],
      default: "Active",
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    beneficiaries: [{
      name: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      relationship: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },
    }],
    documents: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      url: {
        type: String,
        required: true,
      },
      uploadDate: {
        type: Date,
        default: Date.now,
      },
    }],
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
insuranceClientSchema.index({ 
  policyNumber: "text", 
  customerName: "text", 
  company: "text",
  phoneNumber: "text"
});

// Index for policy number uniqueness
insuranceClientSchema.index({ policyNumber: 1 }, { unique: true });

// Virtual for full address
insuranceClientSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}, ${this.address.country}`;
});

// Virtual for days until expiry
insuranceClientSchema.virtual('daysUntilExpiry').get(function() {
  const today = new Date();
  const expiry = new Date(this.expiryDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

module.exports = mongoose.model("InsuranceClient", insuranceClientSchema);
