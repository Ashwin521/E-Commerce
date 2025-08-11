const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/products");

require("dotenv").config();

const importRoute = require("./routes/importProducts");
// const productRoutes = require("./routes/products");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect("mongodb://localhost:27017/ecom")
  .then(() => console.log("Database connected successfully"))
  .catch((e) => console.log(e.message));

// Routes
app.use("/api", importRoute);
// app.use("/api", productRoutes);
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("This is the backend home"); // ✅ Always send a response
});

app.use("/api/auth", require("./routes/authRoutes"));
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
