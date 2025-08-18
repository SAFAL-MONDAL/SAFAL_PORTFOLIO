import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        error: "Invalid Request body",
      });
    }
    const admin = await Admin.create({
      username: username,
      password: password,
    });
    return res.status(201).json({
      success: true,
      message: "Admin created done",
      admin: admin.username,
    });
  } catch (error) {
    console.error("Error occured in creating a admin");
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
