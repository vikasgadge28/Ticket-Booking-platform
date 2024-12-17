import jwt from "jsonwebtoken";
import User from '../models/users.model.js'; // Ensure the extension is correct

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Ensure your secret is set
    req.user = decoded; // Attach user info
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token." });
  }
};

export const isAdmin = (req, res, next) => {
  // Assuming the role is attached to req.user (e.g., after decoding JWT)
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
};

