const express = require("express");
const router = express.Router();
const superCoinController = require("../controller/superCoins");

router.post("/user-super-coins", superCoinController.getUserSuperCoins);
router.post("/spend-super-coins", superCoinController.spendSuperCoins);

module.exports = router;
