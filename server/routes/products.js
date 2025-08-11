const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getCategories,
} = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.get("/categories", getCategories);

module.exports = router;
