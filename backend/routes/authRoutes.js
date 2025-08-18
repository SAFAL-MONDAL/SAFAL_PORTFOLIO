import express from "express";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

// Authentication route
router.post("/admin/login", login);
router.post("/admin/signup", signup);

export default router;
