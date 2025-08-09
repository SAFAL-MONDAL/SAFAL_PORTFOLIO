// backend/seed.js
import Admin from './models/Admin.js';
import Project from './models/Project.js';
import Blog from './models/Blog.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleProjects = [
  {
    title: "Student Mentoring System",
    description: "A university-based mentoring system developed using HTML, CSS, MongoDB, Node.js, Docker, and AWS ECS.",
    technologies: ["HTML", "CSS", "MongoDB", "Node.js", "Docker", "AWS EC2"],
    githubLink: "https://github.com/SAFAL-MONDAL/Mentoring_Website",
    liveLink: "https://std-mentoring-edu.netlify.app/",
    image: "/mentoring.webp",
    featured: true,
    order: 1
  },
  {
    title: "Chatbot (Bongo ai)",
    description: "Developed a responsive AI chatbot leveraging HTML, CSS, JavaScript, and integrated with the Gemini API.",
    technologies: ["HTML", "CSS", "JavaScript", "Gemini API key"],
    githubLink: "https://github.com/SAFAL-MONDAL/SAFAL-AI",
    liveLink: "https://safal-ai.vercel.app/",
    image: "/chatbot.avif",
    featured: true,
    order: 2
  },
  {
    title: "University-Based Intern Portal",
    description: "An intern portal for universities developed using MongoDB, Express.js, Node.js, and React.js.",
    technologies: ["MongoDB", "Express.js", "Node.js", "React.js", "Rest API"],
    githubLink: "https://github.com/SAFAL-MONDAL/Internship_Portal",
    liveLink: "https://yourwebsite.com/university-intern-portal",
    image: "/internship.webp",
    featured: true,
    order: 3
  }
];

// Sample blogs with slugs
// Ensure slugs are unique and follow a consistent format
const sampleBlogs = [
  {
    title: "The Future of React and Server Components",
    slug: "the-future-of-react-and-server-components", // Added slug
    category: "Web Development",
    content: "Server Components represent a paradigm shift in React development...",
    excerpt: "Exploring the revolutionary changes that React Server Components bring to modern web development.",
    image: "/blog-react.jpg",
    published: true,
    tags: ["React", "JavaScript", "Web Development"],
    readTime: 8
  },
  {
    title: "Building Scalable Applications with Microservices",
    slug: "building-scalable-applications-with-microservices", // Added slug
    category: "Backend Development",
    content: "Microservices architecture has become increasingly popular...",
    excerpt: "A comprehensive guide to designing and implementing microservices architecture.",
    image: "/blog-microservices.jpg",
    published: true,
    tags: ["Microservices", "Architecture", "Backend"],
    readTime: 12
  },
  {
    title: "Mastering Modern JavaScript ES2024 Features",
    slug: "mastering-modern-javascript-es2024-features", // Added slug
    category: "Programming",
    content: "JavaScript continues to evolve with new features...",
    excerpt: "Discover the latest JavaScript features that will improve your code quality and productivity.",
    image: "/blog-js.jpg",
    published: false,
    tags: ["JavaScript", "ES2024", "Programming"],
    readTime: 6
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...');
    
    // Create admin
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const admin = new Admin({
        username: 'admin',
        password: 'Safal_1234'
      });
      await admin.save();
      console.log('✅ Admin created successfully');
    } else {
      console.log('ℹ️  Admin already exists');
    }

    // Seed projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(sampleProjects);
      console.log('✅ Sample projects created successfully');
    } else {
      console.log('ℹ️  Projects already exist');
    }

 // Seed blogs
const blogCount = await Blog.countDocuments();
if (blogCount === 0) {
  const blogsWithSlugs = sampleBlogs.map(blog => ({
    ...blog,
    slug: blog.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
  }));
  await Blog.insertMany(blogsWithSlugs);
  console.log('✅ Sample blogs created successfully');
} else {
  console.log('ℹ️  Blogs already exist');
}

    console.log('🎉 Database seeding completed!');
    console.log('\n📋 Summary:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log(`Projects: ${await Project.countDocuments()}`);
    console.log(`Blogs: ${await Blog.countDocuments()}`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();