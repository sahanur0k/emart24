const express = require("express");
const router = express.Router();
const insuranceController = require("../controllers/insuranceController");
const multer = require("multer");
const { loginCheck, isAdminOrEmployee } = require("../../middleware/auth");

// Image Upload setting for insurances
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/insurances");
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
router.get("/all-insurances", insuranceController.getAllInsurances);
router.get("/insurances-by-type/:insuranceType", insuranceController.getInsurancesByType);
router.get("/insurance/:insuranceId", insuranceController.getInsuranceById);

// Admin/Employee routes
router.get("/admin/all-insurances", loginCheck, isAdminOrEmployee, insuranceController.getAllInsurancesAdmin);
router.post(
  "/admin/create-insurance",
  loginCheck,
  isAdminOrEmployee,
  (req, res, next) => {
    // Temporarily skip file upload to test basic functionality
    upload.array("images", 2)(req, res, (err) => {
      if (err) {
        console.log("Upload error:", err);
        // Continue anyway for testing
      }
      next();
    });
  },
  insuranceController.createInsurance
);
router.put(
  "/admin/update-insurance/:insuranceId",
  loginCheck,
  isAdminOrEmployee,
  upload.array("images", 2),
  insuranceController.updateInsurance
);
router.delete("/admin/delete-insurance/:insuranceId", loginCheck, isAdminOrEmployee, insuranceController.deleteInsurance);

module.exports = router;
