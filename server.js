// Packages
const express = require("express");
const path = require("path");

// App setup
const app = express();

// Routes
const homeRoutes = require("./routes/home.routes");
const postsRoutes = require("./routes/posts.routes");

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use("/", homeRoutes);      // homepage, about, etc.
app.use("/posts", postsRoutes); // posts page

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
