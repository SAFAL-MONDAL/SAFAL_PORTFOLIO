import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Added this import
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Function to create collections if they don't exist
const createCollections = async () => {
  try {
    const db = mongoose.connection.db;
    
    // Create collections if they don't exist
    if (!await db.listCollections({ name: 'admins' }).hasNext()) {
      await db.createCollection('admins');
      console.log('Created admins collection');
    }
    
    if (!await db.listCollections({ name: 'messages' }).hasNext()) {
      await db.createCollection('messages');
      console.log('Created messages collection');
    }
  } catch (err) {
    console.error('Collection creation error:', err);
  }
};

// Wait for connection then create collections
mongoose.connection.once('open', createCollections);

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/contact', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Contact App API');
});

// Diagnostic endpoint
app.get('/api/db-status', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const adminCount = await db.collection('admins')?.countDocuments() || 0;
    const messageCount = await db.collection('messages')?.countDocuments() || 0;
    
    res.json({
      status: 'Connected',
      database: mongoose.connection.name,
      collections: collections.map(c => c.name),
      counts: {
        admins: adminCount,
        messages: messageCount
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});