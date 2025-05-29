const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { loginCheck, isAdmin, isAdminOrEmployee } = require("../../middleware/auth");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogStatistics,
} = require("../controllers/blogController");

// Configure multer for blog image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/blogs");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Public routes for blog viewing
router.get("/", getAllBlogs); // Public route for all blogs
router.get("/:blogId", getBlogById); // Public route for single blog

// Admin/Employee routes for blog management
router.get("/admin/blogs", loginCheck, isAdminOrEmployee, getAllBlogs);
router.get("/admin/blogs/:blogId", loginCheck, isAdminOrEmployee, getBlogById);
router.post("/admin/blogs", loginCheck, isAdminOrEmployee, upload.single('featuredImage'), createBlog);
router.put("/admin/blogs/:blogId", loginCheck, isAdminOrEmployee, upload.single('featuredImage'), updateBlog);
router.delete("/admin/blogs/:blogId", loginCheck, isAdminOrEmployee, deleteBlog);
router.get("/admin/statistics", loginCheck, isAdminOrEmployee, getBlogStatistics);

module.exports = router;
