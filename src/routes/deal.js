const express = require('express');
const router = express.Router();
const dealController = require('../app/controller/DealController');
const {requireAuth} = require('../middleware/authMiddleware');

router.post("/buydeal", requireAuth, dealController.buyDeal);
router.post("/auctiondeal", requireAuth, dealController.auctionDeal);

module.exports = router;