const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema(
  {
    product_url: String,
    product_name: String,
    product_category_tree: String,
    pid: String,
    retail_price: Number,
    discounted_price: Number,
    image: String,
    is_FK_Advantage_product: Boolean,
    description: String,
    product_rating: Number,
    overall_rating: Number,
    brand: String,
    product_specifications: String,
    isFeatured: { type: Boolean, default: false }, // ✅ Added field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
