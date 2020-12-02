const Deal = require('../models/Deal');
const { toArrObject } = require('../../util/mongooes');
const { toObject } = require('../../util/mongooes');
const userinfo = require('../../util/userinfo');

class DealController {
    
    //POST /deal/buydeal
    async buyDeal(req, res){
        let buyerID = userinfo(req);
        let rs = await Deal.create({
            product : req.body.product,
            buyer: buyerID,
            seller: req.body.seller
        })
        if(rs){
            res.status(200).json({success : "Tạo yêu cầu mua thành công"});
        }
        else{
            res.status(400).json({error : "Tạo yêu cầu mua thất bại"});
        }
    }
    //POST /deal/auctiondeal
    async auctionDeal(req, res){
        let buyerID = userinfo(req);
        let rs = await Deal.create({
            product : req.body.product,
            buyer: buyerID,
            seller: req.body.seller,
            auction_price : req.body.auction_price,
            type: true
        })
        if(rs){
            res.status(200).json({success : "Tạo yêu cầu đấu giá thành công"});
        }
        else{
            res.status(400).json({error : "Tạo yêu cầu đấu giá thất bại"});
        }
    }


    //GET /deal/manager
    manager(req,res){
        res.render('user/dealmanager');
    }
}

module.exports = new DealController;