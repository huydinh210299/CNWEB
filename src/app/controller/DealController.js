const Deal = require('../models/Deal');
const { toArrObject } = require('../../util/mongooes');
const { toObject } = require('../../util/mongooes');
const userinfo = require('../../util/userinfo');
const Product = require('../models/Product');
const mongoose =  require('mongoose');

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


    //GET /deal/manager/:id
    manager(req,res){
        Deal.find({ product: req.params.id })
        .populate('buyer')
        .then(deal => res.render('user/dealmanager',{
            deal : toArrObject(deal),
            productid : req.params.id
        }))
        .catch(err => console.log(err));
    }

    //POST /deal/nmanager
    async post_manager(req,res){
        let product = req.body.product;
        let deal = req.body.deal;
        let rs = await Product.updateOne({ _id: product }, {
            $set: {
                completed: true,
            }
        });
        await Deal.updateMany({_id : { $ne : deal },product : product},{
            result : "fail"
        })
        await Deal.updateOne({_id : deal},{
            result : "done"
        })
        if(rs){
            res.status(200).json({success : "done"})
        }
        else return res.status(200).json({error : "fail"})
    }

    //POST /deal/delete
    async deleteDeal(req, res){
        let id = req.body.id;
        let rs = await Deal.deleteOne({_id : id});
        if(rs){
            return res.status(200).json({success : "done"});
        }
        else{
            res.status(500).json({error: "fail"});
        }
    }
}

module.exports = new DealController;