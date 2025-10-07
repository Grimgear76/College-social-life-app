const express = require("express");
const path = require("path");

const app = express();

// Import routes
const homeRoutes = require("./routes/home.routes");
const postsRoutes = require("./routes/posts.routes");

// Middleware
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Static files

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", homeRoutes);       // Homepage, about, etc.
app.use("/posts", postsRoutes); // Posts page

// Redirect root to /posts
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
