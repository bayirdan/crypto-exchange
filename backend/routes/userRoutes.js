const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");

router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/dashboard", protect, getMe);

module.exports = router;
