import express from 'express';
import { submitMessage, getMessages } from '../controllers/contactController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Public route
router.post('/submit', submitMessage);

// Protected route
router.get('/admin/messages', auth, getMessages);

export default router;