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
    origin: ["http://localhost:5173"], // React dev server port
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// MongoDB connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env. Please add it!");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully")) //if you dont see this good luck
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Our API Routes
const postsRouter = require("./routes/Posts");
app.use("/api/posts", postsRouter);

// Frontend serving
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // Catch-all route
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      ws: true,
      logLevel: "silent",
    })
  );
}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
