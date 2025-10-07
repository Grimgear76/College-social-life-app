
// controllers/home.controller.js
exports.getHomePage = (req, res) => {
  res.render("homepage", { title: "Home" }); // renders views/index.ejs
};
