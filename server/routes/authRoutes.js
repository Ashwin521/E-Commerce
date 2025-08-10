const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/login", loginUser);

module.exports = router;
