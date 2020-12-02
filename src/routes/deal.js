const express = require('express');
const DealController = require('../app/controller/DealController');
const router = express.Router();
const dealController = require('../app/controller/DealController');
const {requireAuth} = require('../middleware/authMiddleware');

router.post("/buydeal", requireAuth, dealController.buyDeal);
router.post("/auctiondeal", requireAuth, dealController.auctionDeal);

//manager
router.get("/manager", requireAuth, DealController.manager);

module.exports = router;