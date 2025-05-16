const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');

// @desc    Login admin
// @route   POST /api/contact/admin/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate request
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password'
      });
    }

    // Check for user
    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = admin.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if admin token is valid
// @route   GET /api/contact/admin/verify
// @access  Private
exports.verifyToken = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        id: req.admin._id,
        username: req.admin.username
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create initial admin user (used for seeding)
// @route   POST /api/contact/admin/seed
// @access  Public (but should be disabled in production)
exports.seedAdmin = async (req, res, next) => {
  try {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({
        success: false,
        message: 'This route is only available in development mode'
      });
    }

    // Check if admin already exists
    const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Admin user already exists'
      });
    }

    // Create admin user
    const admin = await Admin.create({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD
    });

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully'
    });
  } catch (error) {
    next(error);
  }
};