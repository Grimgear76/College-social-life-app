const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://User:63592@CollegeApp.kd9sx.mongodb.net/socialAppDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("MongoDB connected"));

// Post schema
const postSchema = new mongoose.Schema({
  user: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Routes
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const { user, content } = req.body;
  if (!user || !content) return res.status(400).json({ msg: "Missing fields" });
  const newPost = new Post({ user, content });
  await newPost.save();
  res.json(newPost);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
