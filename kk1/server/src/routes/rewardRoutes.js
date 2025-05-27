const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/auth");
const {
  getRewards,
  updateRewardStatus,
} = require("../controllers/rewardController");

router.get("/rewards", isAuth, isAdmin, getRewards);
router.put("/rewards/:id", isAuth, isAdmin, updateRewardStatus);

module.exports = router; 