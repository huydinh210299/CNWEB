const express = require('express');
const router = express.Router();
const homeController = require('../app/controller/HomeController');
const {requireAuth} = require('../middleware/authMiddleware');

router.get('/', requireAuth,  homeController.index);

module.exports = router;