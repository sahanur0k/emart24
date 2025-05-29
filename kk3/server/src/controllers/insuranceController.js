const Insurance = require("../models/Insurance");
const fs = require("fs");
const path = require("path");

// Get all insurances for public (user-facing)
exports.getAllInsurances = async (req, res) => {
  try {
    const insurances = await Insurance.find({ status: "Active" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      insurances,
      count: insurances.length,
    });
  } catch (error) {
    console.error("Error fetching insurances:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch insurances",
    });
  }
};

// Get all insurances for admin
exports.getAllInsurancesAdmin = async (req, res) => {
  try {
    const insurances = await Insurance.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      insurances,
      count: insurances.length,
    });
  } catch (error) {
    console.error("Error fetching insurances for admin:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch insurances",
    });
  }
};

// Get insurance by ID
exports.getInsuranceById = async (req, res) => {
  try {
    const { insuranceId } = req.params;
    const insurance = await Insurance.findById(insuranceId);

    if (!insurance) {
      return res.status(404).json({
        success: false,
        error: "Insurance not found",
      });
    }

    res.status(200).json({
      success: true,
      insurance,
    });
  } catch (error) {
    console.error("Error fetching insurance:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch insurance",
    });
  }
};

// Get insurances by type
exports.getInsurancesByType = async (req, res) => {
  try {
    const { insuranceType } = req.params;
    const insurances = await Insurance.find({
      insuranceType,
      status: "Active"
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      insurances,
      count: insurances.length,
    });
  } catch (error) {
    console.error("Error fetching insurances by type:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch insurances",
    });
  }
};

// Create new insurance (Admin only)
exports.createInsurance = async (req, res) => {
  try {
    const {
      insuranceName,
      description,
      insuranceType,
      price,
      duration,
      coverage,
      features,
      serviceType,
      status,
    } = req.body;

    // Validation
    if (!insuranceName || !description || !price || !coverage) {
      return res.status(400).json({
        success: false,
        error: "Insurance name, description, price, and coverage are required",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        error: "Price must be greater than 0",
      });
    }

    // Handle image uploads
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.filename);
    }

    // Parse features if it's a string
    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
      } catch (error) {
        parsedFeatures = Array.isArray(features) ? features : [features];
      }
    }

    const insurance = new Insurance({
      insuranceName,
      description,
      insuranceType: insuranceType || "Health",
      price: parseFloat(price),
      duration: duration || "Annual",
      coverage,
      features: parsedFeatures,
      serviceType: serviceType || "Basic Shop",
      images,
      status: status || "Active",
      createdBy: req.userDetails._id,
    });

    await insurance.save();

    res.status(201).json({
      success: true,
      message: "Insurance created successfully",
      insurance,
    });
  } catch (error) {
    console.error("Error creating insurance:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create insurance",
    });
  }
};

// Update insurance (Admin only)
exports.updateInsurance = async (req, res) => {
  try {
    const { insuranceId } = req.params;
    const {
      insuranceName,
      description,
      insuranceType,
      price,
      duration,
      coverage,
      features,
      serviceType,
      status,
    } = req.body;

    const insurance = await Insurance.findById(insuranceId);
    if (!insurance) {
      return res.status(404).json({
        success: false,
        error: "Insurance not found",
      });
    }

    // Validation
    if (price && price <= 0) {
      return res.status(400).json({
        success: false,
        error: "Price must be greater than 0",
      });
    }

    // Handle image uploads
    let images = insurance.images || [];
    if (req.files && req.files.length > 0) {
      // Delete old images
      if (insurance.images && insurance.images.length > 0) {
        insurance.images.forEach(image => {
          const imagePath = path.join(__dirname, "../../public/uploads/insurances", image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      }
      images = req.files.map(file => file.filename);
    }

    // Parse features if it's a string
    let parsedFeatures = insurance.features;
    if (features !== undefined) {
      try {
        parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
      } catch (error) {
        parsedFeatures = Array.isArray(features) ? features : [features];
      }
    }

    // Update insurance
    const updatedInsurance = await Insurance.findByIdAndUpdate(
      insuranceId,
      {
        insuranceName: insuranceName || insurance.insuranceName,
        description: description || insurance.description,
        insuranceType: insuranceType || insurance.insuranceType,
        price: price ? parseFloat(price) : insurance.price,
        duration: duration || insurance.duration,
        coverage: coverage || insurance.coverage,
        features: parsedFeatures,
        serviceType: serviceType || insurance.serviceType,
        images,
        status: status || insurance.status,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Insurance updated successfully",
      insurance: updatedInsurance,
    });
  } catch (error) {
    console.error("Error updating insurance:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update insurance",
    });
  }
};

// Delete insurance (Admin only)
exports.deleteInsurance = async (req, res) => {
  try {
    const { insuranceId } = req.params;

    const insurance = await Insurance.findById(insuranceId);
    if (!insurance) {
      return res.status(404).json({
        success: false,
        error: "Insurance not found",
      });
    }

    // Delete associated images
    if (insurance.images && insurance.images.length > 0) {
      insurance.images.forEach(image => {
        const imagePath = path.join(__dirname, "../../public/uploads/insurances", image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    await Insurance.findByIdAndDelete(insuranceId);

    res.status(200).json({
      success: true,
      message: "Insurance deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting insurance:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete insurance",
    });
  }
};
