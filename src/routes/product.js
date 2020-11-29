const express = require('express');
const router = express.Router();
const productController = require('../app/controller/ProductController');
const {requireAuth} = require('../middleware/authMiddleware');

router.get('/auction',requireAuth, productController.auction);
router.get('/info/:slug',requireAuth, productController.productInfo);
//create
router.get('/create',requireAuth, productController.create);
router.post('/create',productController.post_creat);

module.exports = router;