// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Products");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
