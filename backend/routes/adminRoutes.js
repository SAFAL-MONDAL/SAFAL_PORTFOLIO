const express = require('express');
const { login, verifyToken, seedAdmin } = require('../controllers/adminController');
const { getMessages, getMessage, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Admin authentication routes
router.post('/login', login);
router.get('/verify', protect, verifyToken);
router.post('/seed', seedAdmin);

// Admin message management routes
router.get('/messages', protect, getMessages);
router.get('/messages/:id', protect, getMessage);
router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;