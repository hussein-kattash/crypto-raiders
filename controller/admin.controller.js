const Admin = require('../models/admin');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt
require("dotenv").config();

async function adminRegister(req, res) {
    try {
        const { username, password, role } = req.body;

        if(!username || !password){
          return res.status(422).json({ message: "Invalid input data" });
        }

        // Check if the username already exists in the database
        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new Admin instance with the hashed password
        const admin = new Admin({ username, password: hashedPassword, role });

        // Save the admin to the database
        await admin.save();

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const jwtSecret = process.env.JWT_SECRET;

async function findAdmin(username) {
  return await Admin.findOne({ username });
}

async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

function generateToken(admin) {
  return jwt.sign({ adminId: admin._id, role: admin.role }, jwtSecret, {
    expiresIn: "1h",
  });
}

async function adminLogin(req, res) {
  const { username, password } = req.body;

  try {
    const admin = await findAdmin(username);

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const validPassword = await checkPassword(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (admin.role !== "admin") {
      return res.status(400).json({ message: "User is not an admin" });
    }

    const token = generateToken(admin);

    res.json({ token });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = {adminRegister, adminLogin}