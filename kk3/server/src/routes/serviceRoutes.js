const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const multer = require("multer");
const { loginCheck, isAdminOrEmployee } = require("../../middleware/auth");

// Image Upload setting for services
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/services");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Public routes
router.get("/all-services", serviceController.getAllServices);
router.get("/services-by-category/:categoryId", serviceController.getServicesByCategory);
router.get("/service/:serviceId", serviceController.getServiceById);

// Admin/Employee routes
router.get("/admin/all-services", loginCheck, isAdminOrEmployee, serviceController.getAllServicesAdmin);
router.post(
  "/admin/create-service",
  loginCheck,
  isAdminOrEmployee,
  upload.array("images", 2), // Allow up to 2 images
  serviceController.createService
);
router.put(
  "/admin/update-service/:serviceId",
  loginCheck,
  isAdminOrEmployee,
  upload.array("images", 2),
  serviceController.updateService
);
router.delete("/admin/delete-service/:serviceId", loginCheck, isAdminOrEmployee, serviceController.deleteService);

module.exports = router;
