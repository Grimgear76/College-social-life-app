// controllers/posts.controller.js
let posts = [
  {
    title: "Engineering Club Meeting",
    date: "October 10, 2025",
    content: "Join us for a 3D printing workshop this Thursday in Room 210!"
  }
];

exports.getPosts = (req, res) => {
  res.render("posts", { posts });
};

exports.addPost = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.redirect("/posts");

  const newPost = {
    title,
    content,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  };

  posts.unshift(newPost); // add new post to top
  res.redirect("/posts");
};
