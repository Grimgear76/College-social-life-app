// routes/home.routes.js
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

// When user visits "/", render homepage
router.get("/", homeController.getHomePage);

module.exports = router;
