require("dotenv").config(); // <-- Load .env variables first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using .env variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connected successfully"));

// Post schema
const postSchema = new mongoose.Schema({
  user: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Routes
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/api/posts", async (req, res) => {
  const { user, content } = req.body;
  console.log("Incoming POST:", req.body); // helps debug

  if (!user || !content) return res.status(400).json({ msg: "Missing fields" });

  try {
    const newPost = new Post({ user, content });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error("Error saving post:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
