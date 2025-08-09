import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// Authentication route
router.post('/admin/login', login);

export default router;