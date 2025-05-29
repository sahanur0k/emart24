const express = require("express");
const router = express.Router();
const { loginCheck, isAdminOnly } = require("../../middleware/auth");
const {
  getAllUsersWithSuperCoins,
  updateUserSuperCoins,
  createRewardCode,
  getAllRewardCodes,
  deleteRewardCode,
} = require("../controllers/adminSuperCoinController");

// Admin-only routes for super coin management
router.get("/users-super-coins", loginCheck, isAdminOnly, getAllUsersWithSuperCoins);
router.post("/update-user-super-coins", loginCheck, isAdminOnly, updateUserSuperCoins);

// Admin-only routes for reward codes
router.post("/reward-codes", loginCheck, isAdminOnly, createRewardCode);
router.get("/reward-codes", loginCheck, isAdminOnly, getAllRewardCodes);
router.delete("/reward-codes/:codeId", loginCheck, isAdminOnly, deleteRewardCode);

module.exports = router;
