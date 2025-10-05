const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

//Homepage route
router.get('/', homeController.showHomepage);

//exports the route
module.exports = router;