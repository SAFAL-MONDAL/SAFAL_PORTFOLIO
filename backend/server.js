// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// DEBUG: Add route debugging before importing route files
const originalMethods = ["get", "post", "put", "delete", "patch", "use", "all"];

originalMethods.forEach((method) => {
  if (app[method]) {
    const original = app[method];
    app[method] = function (path, ...handlers) {
      console.log(`🔍 Registering ${method.toUpperCase()} route:`, path);
      try {
        return original.call(this, path, ...handlers);
      } catch (error) {
        console.error(
          `❌ Error registering ${method.toUpperCase()} route "${path}":`,
          error.message
        );
        console.error("Full error:", error);
        throw error;
      }
    };
  }
});

// Import route files AFTER setting up debugging
console.log("📁 Importing contactRoutes...");
import contactRoutes from "./routes/contactRoutes.js";
console.log("📁 Importing authRoutes...");
import authRoutes from "./routes/authRoutes.js";
console.log("📁 Importing projectRoutes...");
import projectRoutes from "./routes/projectRoutes.js";
console.log("📁 Importing blogRoutes...");
import blogRoutes from "./routes/blogRoutes.js";
// Enhanced CORS configuration

app.use(cors());

// Handle preflight requests
// app.options("*", cors(corsOptions));
// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || [
      "http://localhost:5173",
      "https://your-frontend-domain.com",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to Database
connectDB();

// Function to create collections if they don't exist
const createCollections = async () => {
  try {
    const db = mongoose.connection.db;

    const collections = ["admins", "messages", "projects", "blogs"];

    for (const collectionName of collections) {
      if (!(await db.listCollections({ name: collectionName }).hasNext())) {
        await db.createCollection(collectionName);
        console.log(`Created ${collectionName} collection`);
      }
    }
  } catch (err) {
    console.error("Collection creation error:", err);
  }
};

// Wait for connection then create collections
mongoose.connection.once("open", createCollections);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({
    message: "Safal Portfolio API",
    version: "2.0.0",
    status: "Running",
    endpoints: [
      "GET / - API info",
      "POST /api/contact/submit - Submit contact form",
      "POST /api/contact/admin/login - Admin login",
      "GET /api/contact/admin/messages - Get messages (protected)",
      "GET /api/projects - Get all projects",
      "POST /api/projects - Create project (protected)",
      "PUT /api/projects/:id - Update project (protected)",
      "DELETE /api/projects/:id - Delete project (protected)",
      "GET /api/blogs - Get all blogs",
      "GET /api/blogs/:slug - Get blog by slug",
      "POST /api/blogs - Create blog (protected)",
      "PUT /api/blogs/:id - Update blog (protected)",
      "DELETE /api/blogs/:id - Delete blog (protected)",
      "GET /api/db-status - Database status",
    ],
  });
});

// Routes - Order matters!
console.log("🛣️  Setting up routes...");
console.log("Setting up /api/contact routes...");
app.use("/api/contact", contactRoutes);
console.log("Setting up /api/contact auth routes...");
app.use("/api/contact", authRoutes);
console.log("Setting up /api/projects routes...");
app.use("/api/projects", projectRoutes);
console.log("Setting up /api/blogs routes...");
app.use("/api/blogs", blogRoutes);

// Diagnostic endpoint
app.get("/api/db-status", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const adminCount = (await db.collection("admins")?.countDocuments()) || 0;
    const messageCount =
      (await db.collection("messages")?.countDocuments()) || 0;
    const projectCount =
      (await db.collection("projects")?.countDocuments()) || 0;
    const blogCount = (await db.collection("blogs")?.countDocuments()) || 0;

    res.json({
      status: "Connected",
      database: mongoose.connection.name,
      collections: collections.map((c) => c.name),
      counts: {
        admins: adminCount,
        messages: messageCount,
        projects: projectCount,
        blogs: blogCount,
      },
      uptime: process.uptime(),
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || "development",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  mongoose.connection.close(() => {
    console.log("Database connection closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  mongoose.connection.close(() => {
    console.log("Database connection closed.");
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📊 Database: ${
      process.env.MONGODB_URI ? "Remote MongoDB" : "Local MongoDB"
    }`
  );
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `📡 CORS enabled for: ${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }`
  );
  console.log(`🔗 API Documentation: http://localhost:${PORT}/`);
});
