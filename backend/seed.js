import Admin from './models/Admin.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (adminExists) {
      console.log('Admin already exists');
      return process.exit();
    }

    const admin = new Admin({
      username: 'admin',  // This matches the frontend login field
      password: 'admin123' // Will be hashed automatically
    });

    await admin.save();
    console.log('✅ Admin created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();