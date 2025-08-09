import express from 'express';
import { 
  getAllProjects, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);

// Protected routes
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

export default router;