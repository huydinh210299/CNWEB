const Product = require('../models/Product');
const path = require('path');
const Category = require('../models/Category');
const { toArrObject } = require('../../util/mongooes');
const { toObject } = require('../../util/mongooes');
const userinfo = require('../../util/userinfo');
const dirupload = path.join(__dirname, '..', '..', 'public', 'upload', 'product');
const {getUrProduct, getUrDeal} = require('../../util/commonFunc');

class ProductController {
    //GET /product/auction
    auction(req, res) {
        Product.findOne({ slug: req.params.slug }).populate('user')
            .then(product => {
                res.render('product/auction', {
                    product: toObject(product)
                });
            })
            .catch(err => console.log(err))
    }

    //GET /product/info
    productInfo(req, res) {
        Product.findOne({ slug: req.params.slug }).populate('user')
            .then(product => {
                res.render('product/productinfo', {
                    product: toObject(product)
                });
            })
            .catch(err => console.log(err))
    }

    //GET /product/create
    create(req, res) {
        Category.find({})
            .then(category => {
                res.render('product/create', {
                    category: toArrObject(category)
                });
            })
            .catch(err => { console.log(err) })
    }

    //POST /product/create
    async post_creat(req, res) {
        const category = await Category.find({});
        let images = [];
        let userID = userinfo(req);
        if (req.files.image) {
            const arr = req.files.image;
            const amount = arr.length;
            for (let i = 0; i < amount; i++) {
                images.push(arr[i]['name']);
            }
            arr.forEach((item, index) => {
                let filename = item.name;
                item.mv(`${dirupload}/${filename}`, (err) => {
                    console.log(err);
                });
            })
        };
        Product.create({
            name: req.body.name,
            price: req.body.price,
            image: images,
            quantity: req.body.quantity,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            user: userID
        })
            .then(
                res.render('product/create', {
                    category: toArrObject(category)
                })
            )
            .catch(err => console.log(err))
    }

    //GET /product/sold
    async sold(req, res) {
        let rs = await getUrProduct(req);
        if(rs){
            res.render('product/sold',{
                product : toArrObject(rs)
            });
        }else{
            res.status(500).json({error : "Lỗi kết nối cơ sở dữ liệu"})
        }
    }
    //GET /product/onsale
    async onsale(req, res) {
        let rs = await getUrProduct(req);
        if(rs){
            res.render('product/onsale',{
                product : toArrObject(rs)
            });
        }else{
            res.status(500).json({error : "Lỗi kết nối cơ sở dữ liệu"})
        }
    }
    //GET /product/buyed
    buyed(req, res) {
        res.render('product/buyed');
    }
    //GET /product/bid
    bid(req, res) {
        res.render('product/bid');
    }

}

module.exports = new ProductController;