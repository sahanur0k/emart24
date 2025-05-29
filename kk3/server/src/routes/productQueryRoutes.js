const express = require("express");
const router = express.Router();
const { loginCheck, isAdminOrEmployee, isAdminOnly } = require("../../middleware/auth");
const {
  createProductQuery,
  getEmployeeQueries,
  getAllQueries,
  updateQueryStatus,
  deleteQuery,
  getQueryStatistics,
} = require("../controllers/productQueryController");

// Employee routes - can create and view their own queries
router.post("/create", loginCheck, isAdminOrEmployee, createProductQuery);
router.get("/employee", loginCheck, isAdminOrEmployee, getEmployeeQueries);

// Admin routes - can view and manage all queries
router.get("/all", loginCheck, isAdminOnly, getAllQueries);
router.put("/:queryId", loginCheck, isAdminOnly, updateQueryStatus);
router.delete("/:queryId", loginCheck, isAdminOnly, deleteQuery);
router.get("/statistics", loginCheck, isAdminOnly, getQueryStatistics);

module.exports = router;
