import express from 'express';
import Blog from '../models/Blog.js'; // ES Modules
import mongoose from 'mongoose';

export const getAllBlogs = async (req, res) => {
  try {
    const { published } = req.query;
    const filter = published === 'true' ? { published: true } : {};
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json({ 
      success: true,
      blogs,
      count: blogs.length
    });
  } catch (err) {
    console.error('Get blogs error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch blogs' 
    });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, published: true });
    
    if (!blog) {
      return res.status(404).json({ 
        success: false,
        error: 'Blog not found' 
      });
    }
    
    res.json({ 
      success: true,
      blog 
    });
  } catch (err) {
    console.error('Get blog by slug error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch blog' 
    });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, category, content, excerpt, image, published, tags, readTime } = req.body;
    
    // Validation
    if (!title || !category || !content || !excerpt || !image) {
      return res.status(400).json({ 
        success: false,
        error: 'Title, category, content, excerpt, and image are required' 
      });
    }

    const newBlog = new Blog({
      title: title.trim(),
      category: category.trim(),
      content: content.trim(),
      excerpt: excerpt.trim(),
      image: image.trim(),
      published: Boolean(published),
      tags: Array.isArray(tags) ? tags : [],
      readTime: Number(readTime) || 5
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ 
      success: true,
      message: 'Blog created successfully', 
      blog: savedBlog 
    });
  } catch (err) {
    console.error('Create blog error:', err);
    if (err.code === 11000) {
      res.status(400).json({ 
        success: false,
        error: 'Blog with this title already exists' 
      });
    } else {
      res.status(500).json({ 
        success: false,
        error: 'Failed to create blog' 
      });
    }
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid blog ID' 
      });
    }

    const updates = req.body;
    
    // Clean up the data
    if (updates.title) updates.title = updates.title.trim();
    if (updates.category) updates.category = updates.category.trim();
    if (updates.content) updates.content = updates.content.trim();
    if (updates.excerpt) updates.excerpt = updates.excerpt.trim();
    if (updates.image) updates.image = updates.image.trim();
    if (updates.published !== undefined) updates.published = Boolean(updates.published);
    if (updates.readTime !== undefined) updates.readTime = Number(updates.readTime);
    
    const blog = await Blog.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ 
        success: false,
        error: 'Blog not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Blog updated successfully', 
      blog 
    });
  } catch (err) {
    console.error('Update blog error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update blog' 
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid blog ID' 
      });
    }
    
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false,
        error: 'Blog not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Blog deleted successfully' 
    });
  } catch (err) {
    console.error('Delete blog error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete blog' 
    });
  }
};