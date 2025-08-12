const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Route imports
const productRoutes = require("./routes/products");
const importRoute = require("./routes/importProducts");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Database connected successfully"))
  .catch((e) => console.error("❌ Database connection error:", e.message));

// Routes
app.get("/", (req, res) => {
  res.send("This is the backend home"); // Always respond to GET /
});

app.use("/api/import", importRoute);
app.use("/api", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
