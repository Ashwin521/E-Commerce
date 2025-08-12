const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const JWT_SECRET = process.env.JWT_SECRET;

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin)
      return res.status(401).json({ message: "Unauthorized, admin not found" });

    // Optionally check role here
    if (admin.role !== "admin" && admin.role !== "superadmin") {
      return res.status(403).json({ message: "Forbidden, insufficient role" });
    }

    req.admin = admin; // Add admin to req object
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, token invalid or expired" });
  }
};

module.exports = adminAuth;
