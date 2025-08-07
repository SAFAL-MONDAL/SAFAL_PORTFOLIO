import express from 'express';
import { submitMessage, getMessages } from '../controllers/contactController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/submit', submitMessage);
router.get('/admin/messages', auth, getMessages);

export default router;