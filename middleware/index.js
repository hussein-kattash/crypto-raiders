const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Middleware to verify the admin role
const verifyAdmin = (req, res, next) => {
    const token = req.header("Authorization");
    const tokenWithoutBearer = token.replace("Bearer ", "");
  
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }
  
    try {
      const decoded = jwt.verify(tokenWithoutBearer, jwtSecret);
      if (decoded.role !== "admin") {
        throw new Error("User is not an admin");
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

module.exports = {verifyAdmin}