const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/Posts.controller');

//Homepage route
router.get('/', PostsController.showPostspage);

//exports the route
module.exports = router;