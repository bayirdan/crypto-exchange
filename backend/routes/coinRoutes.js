const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getCoins,
  addCoin,
  getCoin,
  sellCoin,
} = require("../controller/coinController");

router.get("/", protect, getCoins);
router.post("/:id", protect, addCoin);
router.get("/:id", protect, getCoin);
router.put("/:id", protect, sellCoin);

module.exports = router;
