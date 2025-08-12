const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Route imports
const productRoutes = require("./routes/products");
const importRoute = require("./routes/importProducts");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const paypalRoutes = require("./routes/paypalRoutes");
const app = express();

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "https://your-frontend.onrender.com", // or "*" for all (not recommended for production)
    credentials: true,
  })
);
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
  res.send("This is the backend home");
});

app.use("/api/import", importRoute);
app.use("/api", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/paypal", paypalRoutes); // ✅ Added PayPal route mount

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
