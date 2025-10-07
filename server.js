const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const postsRoutes = require("./routes/posts.routes");
app.use("/posts", postsRoutes);

// Homepage (optional)
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
