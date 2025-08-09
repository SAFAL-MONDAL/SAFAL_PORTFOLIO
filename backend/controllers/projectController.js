// backend/controllers/projectController.js
import Project from '../models/Project.js';
import mongoose from 'mongoose';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ 
      success: true,
      projects,
      count: projects.length
    });
  } catch (err) {
    console.error('Get projects error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch projects' 
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink, image, featured, order } = req.body;
    
    // Validation
    if (!title || !description || !image) {
      return res.status(400).json({ 
        success: false,
        error: 'Title, description, and image are required' 
      });
    }

    const newProject = new Project({
      title: title.trim(),
      description: description.trim(),
      technologies: Array.isArray(technologies) ? technologies : [],
      githubLink: githubLink?.trim() || '',
      liveLink: liveLink?.trim() || '',
      image: image.trim(),
      featured: Boolean(featured),
      order: Number(order) || 0
    });

    const savedProject = await newProject.save();
    res.status(201).json({ 
      success: true,
      message: 'Project created successfully', 
      project: savedProject 
    });
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create project' 
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid project ID' 
      });
    }

    const updates = req.body;
    
    // Clean up the data
    if (updates.title) updates.title = updates.title.trim();
    if (updates.description) updates.description = updates.description.trim();
    if (updates.githubLink) updates.githubLink = updates.githubLink.trim();
    if (updates.liveLink) updates.liveLink = updates.liveLink.trim();
    if (updates.image) updates.image = updates.image.trim();
    if (updates.featured !== undefined) updates.featured = Boolean(updates.featured);
    if (updates.order !== undefined) updates.order = Number(updates.order);
    
    const project = await Project.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ 
        success: false,
        error: 'Project not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Project updated successfully', 
      project 
    });
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update project' 
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid project ID' 
      });
    }
    
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false,
        error: 'Project not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Project deleted successfully' 
    });
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete project' 
    });
  }
};