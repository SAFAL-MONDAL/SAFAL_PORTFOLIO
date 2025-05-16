// utils/seedDb.js
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

// Load env vars - use absolute path to ensure .env is found
dotenv.config({ path: path.join(__dirname, '../.env') });

// Verify MONGO_URI is loaded
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);

// Connect to DB with better error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 10s
})
.then(() => {
  console.log('DB connected successfully');
  createAdmin();
})
.catch(err => {
  console.error('DB connection error:', err.message);
  process.exit(1);
});

// Create admin user
const createAdmin = async () => {
  try {
    console.log('Checking for existing admin...');
    
    // Check if admin already exists
    const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });

    if (adminExists) {
      console.log('Admin user already exists');
      return process.exit(0);
    }

    console.log('Creating new admin user...');
    
    // Create admin user
    const admin = new Admin({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD
    });

    await admin.save();

    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};