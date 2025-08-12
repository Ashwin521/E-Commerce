// controllers/productController.js
const Product = require("../models/Products");

// Helper: Clean image + format price
const formatProduct = (p) => {
  let images = [];

  try {
    images = Array.isArray(p.image) ? p.image : JSON.parse(p.image || "[]");
  } catch {
    images = [p.image];
  }

  let firstImage = images[0] || "";

  // Add backend host for relative paths
  if (firstImage && !firstImage.startsWith("http")) {
    firstImage = `http://localhost:5000/${firstImage.replace(/^\/+/, "")}`;
  }

  return {
    ...p.toObject(),
    image: firstImage,
    discounted_price: (p.discounted_price / 100).toFixed(2), // price in dollars
    retail_price: (p.retail_price / 100).toFixed(2),
  };
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    const cleaned = products.map(formatProduct);
    res.status(200).json(cleaned);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(formatProduct(product));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("product_category_tree");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts, getProductById, getCategories };
