require("dotenv").config({ path: "./backend/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend dev port
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Check Mongo URI
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env. Please add it!");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Define Post schema and model
const postSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema);

// API Routes
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/api/posts", async (req, res) => {
  const { user, content } = req.body;
  if (!user || !content) return res.status(400).json({ msg: "Missing fields" });

  try {
    const newPost = new Post({ user, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error saving post:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Serve React in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
} else {
  // In dev, proxy all non-API requests to Vite dev server
  const { createProxyMiddleware } = require("http-proxy-middleware");
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
    })
  );
}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
