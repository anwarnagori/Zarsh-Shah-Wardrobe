import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.isAdmin) {
        // 🔹 Admin token case
        req.user = await Admin.findById(decoded.id).select("-password");
      } else {
        // 🔹 Normal user case
        req.user = await User.findById(decoded.id).select("-password");
      }

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// ✅ Admin-only routes
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.email && req.user.email.includes("admin")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin only." });
  }
};
