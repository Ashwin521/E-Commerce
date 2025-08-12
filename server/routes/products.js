const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const {
  getProducts,
  getProductById,
  getCategories,
} = require("../controllers/productController");

// Get all products
router.get("/products", getProducts);

// Get product by ID (must come after /products, before any generic :id)
router.get("/products/:id", getProductById);

// Get featured products
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get categories
router.get("/categories", getCategories);

module.exports = router;
