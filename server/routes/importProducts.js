const express = require("express");
const router = express.Router();
const fs = require("fs");
const Papa = require("papaparse");
const Product = require("../models/Products");

router.get("/import-csv", async (req, res) => {
  try {
    await Product.deleteMany(); // Optional: clear old data

    let batch = [];
    const BATCH_SIZE = 1000; // insert in chunks

    Papa.parse(fs.createReadStream("data/flipkart_com-ecommerce_sample.csv"), {
      header: true,
      skipEmptyLines: true,
      step: async (result, parser) => {
        const row = result.data;

        batch.push({
          product_url: row.product_url,
          product_name: row.product_name,
          product_category_tree: row.product_category_tree,
          pid: row.pid,
          retail_price: parseFloat(row.retail_price) || 0,
          discounted_price: parseFloat(row.discounted_price) || 0,
          image: row.image,
          is_FK_Advantage_product: row.is_FK_Advantage_product === "TRUE",
          description: row.description,
          product_rating: parseFloat(row.product_rating) || null,
          overall_rating: parseFloat(row.overall_rating) || null,
          brand: row.brand,
          product_specifications: row.product_specifications,
        });

        // Insert batch when size reached
        if (batch.length >= BATCH_SIZE) {
          parser.pause(); // Pause stream
          await Product.insertMany(batch);
          batch = [];
          parser.resume(); // Resume stream
        }
      },
      complete: async () => {
        // Insert any leftover rows
        if (batch.length > 0) {
          await Product.insertMany(batch);
        }
        res.status(200).json({ message: "CSV imported successfully" });
      },
      error: (err) => {
        res.status(500).json({ error: err.message });
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
