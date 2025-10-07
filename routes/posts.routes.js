const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller'); // lowercase!

// GET /posts
router.get('/', postsController.showPosts);

module.exports = router;
