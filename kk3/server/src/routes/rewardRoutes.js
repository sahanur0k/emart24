const express = require("express");
const router = express.Router();
const { loginCheck, isAdminOnly } = require("../../middleware/auth");
const {
  getRewards,
  updateRewardStatus,
} = require("../controllers/rewardController");

router.get("/rewards", loginCheck, isAdminOnly, getRewards);
router.put("/rewards/:id", loginCheck, isAdminOnly, updateRewardStatus);

module.exports = router;