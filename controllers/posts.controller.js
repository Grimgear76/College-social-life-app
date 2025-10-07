// controllers/posts.controller.js
exports.showPosts = (req, res) => {
  res.render('posts', { title: 'Posts' });
};
