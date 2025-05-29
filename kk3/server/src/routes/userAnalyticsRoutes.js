const express = require("express");
const router = express.Router();
const { loginCheck, isAdminOnly } = require("../../middleware/auth");
const {
  getUserAnalytics,
  getUserDetails
} = require("../controllers/userAnalyticsController");

// Admin-only routes for user analytics
router.get("/analytics", loginCheck, isAdminOnly, getUserAnalytics);
router.get("/details/:userId", loginCheck, isAdminOnly, getUserDetails);

module.exports = router;
