const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(
      "https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=281407&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&min_price=1&max_price=200&limit=10&country=US",
      {
        headers: {
          "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    res.json(response.data.data.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
