const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");

// Public routes (e.g., admin register/login)
router.post("/admin-register", adminController.registerAdmin);
router.post("/admin-login", adminController.loginAdmin);

// Protected routes example
// router.get("/dashboard", authAdminMiddleware, adminController.getDashboard);
// router.post("/products", authAdminMiddleware, adminController.createProduct);
// // Add other protected admin routes here

module.exports = router;
