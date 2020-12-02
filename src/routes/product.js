const express = require('express');
const router = express.Router();
const productController = require('../app/controller/ProductController');
const {requireAuth} = require('../middleware/authMiddleware');
//auction
router.get('/auction/:slug',requireAuth, productController.auction);


router.get('/info/:slug',requireAuth, productController.productInfo);

//create
router.get('/create',requireAuth, productController.create);
router.post('/create',productController.post_creat);

// list product
router.post('/onsale',requireAuth, productController.onsale);
router.post('/sold',requireAuth, productController.sold);
router.post('/buyed',requireAuth, productController.buyed);
router.post('/bid',requireAuth, productController.bid);

// search
router.post('/search',requireAuth, productController.search);

module.exports = router;