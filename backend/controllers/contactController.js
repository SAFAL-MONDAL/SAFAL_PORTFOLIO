const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
exports.submitMessage = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const { name, email, message } = req.body;

    // Create new contact message
    const contact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages (Admin only)
// @route   GET /api/contact/admin/messages
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single message (Admin only)
// @route   GET /api/contact/admin/messages/:id
// @access  Private
exports.getMessage = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Mark as read if not already read
    if (!message.readAt) {
      message.readAt = Date.now();
      await message.save();
    }

    res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message (Admin only)
// @route   DELETE /api/contact/admin/messages/:id
// @access  Private
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};