const Service = require("../models/Service");
const Category = require("../../models/categories");
const fs = require("fs");
const path = require("path");

// Get all services (public)
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ status: "Active" })
      .populate("category", "cName")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get services by category (public)
exports.getServicesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const services = await Service.find({
      category: categoryId,
      status: "Active"
    })
      .populate("category", "cName")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json({ services });
  } catch (error) {
    console.error("Error fetching services by category:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get single service (public)
exports.getServiceById = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId)
      .populate("category", "cName cDescription")
      .populate("createdBy", "name email");

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Admin: Get all services
exports.getAllServicesAdmin = async (req, res) => {
  try {
    const services = await Service.find({})
      .populate("category", "cName")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json({ services });
  } catch (error) {
    console.error("Error fetching services for admin:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Admin: Create service
exports.createService = async (req, res) => {
  try {
    const { serviceName, description, price, category, serviceType, status } = req.body;
    const images = req.files;

    // Validation
    if (!serviceName || !description || !price) {
      // Delete uploaded images if validation fails
      if (images && images.length > 0) {
        images.forEach(img => {
          const filePath = path.join(__dirname, "../../public/uploads/services", img.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!images || images.length < 1 || images.length > 2) {
      // Delete uploaded images if validation fails
      if (images && images.length > 0) {
        images.forEach(img => {
          const filePath = path.join(__dirname, "../../public/uploads/services", img.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
      return res.status(400).json({ error: "Service must have 1 or 2 images" });
    }

    if (price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    // Create service
    const imageFilenames = images.map(img => img.filename);

    const service = new Service({
      serviceName,
      description,
      price: parseFloat(price),
      images: imageFilenames,
      serviceType: serviceType || "Basic Shop",
      status: status || "Active",
      createdBy: req.userDetails._id
    });

    await service.save();

    res.json({
      success: true,
      message: "Service created successfully",
      service
    });
  } catch (error) {
    console.error("Error creating service:", error);

    // Delete uploaded images if error occurs
    if (req.files && req.files.length > 0) {
      req.files.forEach(img => {
        const filePath = path.join(__dirname, "../../public/uploads/services", img.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Admin: Update service
exports.updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { serviceName, description, price, category, serviceType, status } = req.body;
    const newImages = req.files;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Validation
    if (!serviceName || !description || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    // Handle image updates
    let imagesToUse = service.images;

    if (newImages && newImages.length > 0) {
      if (newImages.length > 2) {
        return res.status(400).json({ error: "Maximum 2 images allowed" });
      }

      // Delete old images
      service.images.forEach(oldImage => {
        const filePath = path.join(__dirname, "../../public/uploads/services", oldImage);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      imagesToUse = newImages.map(img => img.filename);
    }

    // Update service
    service.serviceName = serviceName;
    service.description = description;
    service.price = parseFloat(price);
    service.serviceType = serviceType || service.serviceType;
    service.status = status || service.status;
    service.images = imagesToUse;

    await service.save();

    res.json({
      success: true,
      message: "Service updated successfully",
      service
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Admin: Delete service
exports.deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Delete associated images
    service.images.forEach(image => {
      const filePath = path.join(__dirname, "../../public/uploads/services", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await Service.findByIdAndDelete(serviceId);

    res.json({
      success: true,
      message: "Service deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
