const express = require("express");
const router = express.Router();
const superCoinController = require("../controller/superCoins");

router.post("/user-super-coins", superCoinController.getUserSuperCoins);
router.post("/pending-super-coins", superCoinController.getPendingSuperCoins);
router.post("/spend-super-coins", superCoinController.spendSuperCoins);
router.post("/redeem-reward-code", superCoinController.redeemRewardCode);

module.exports = router;
