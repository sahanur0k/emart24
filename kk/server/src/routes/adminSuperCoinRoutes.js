const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middleware/auth");
const {
  getAllUsersWithSuperCoins,
  updateUserSuperCoins,
  createRewardCode,
  getAllRewardCodes,
  deleteRewardCode,
} = require("../controllers/adminSuperCoinController");

// Admin routes for super coin management
router.get("/users-super-coins", isAuth, isAdmin, getAllUsersWithSuperCoins);
router.post("/update-user-super-coins", isAuth, isAdmin, updateUserSuperCoins);

// Admin routes for reward codes
router.post("/reward-codes", isAuth, isAdmin, createRewardCode);
router.get("/reward-codes", isAuth, isAdmin, getAllRewardCodes);
router.delete("/reward-codes/:codeId", isAuth, isAdmin, deleteRewardCode);

module.exports = router;
