const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getCoins,
  addCoin,
  getCoin,
  sellCoin,
  getSearch,
  getWallet,
} = require("../controller/coinController");

router.get("/", getCoins);
router.post("/search", getSearch);
router.get("/coin/:id", getCoin);
router.get("/wallet", protect, getWallet);
router.post("/coin/:id", protect, addCoin);
router.put("/coin/:id", protect, sellCoin);

module.exports = router;
