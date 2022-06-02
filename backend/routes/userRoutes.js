const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getMe,
  setBalance,
} = require("../controller/userController");

router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/dashboard", protect, getMe);

router.put("/set-balance", protect, setBalance);

module.exports = router;
