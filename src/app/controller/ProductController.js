const Product = require('../models/Product');
const path = require('path');
const Category = require('../models/Category');
const { toArrObject, toObject } = require('../../util/mongooes');
const userinfo = require('../../util/userinfo');
const dirupload = path.join(__dirname, '..', '..', 'public', 'upload', 'product');
const { getUrProduct, getUrDeal ,searchProduct, getCategory} = require('../../util/commonFunc');

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
        Product.findOne({ slug: req.params.slug })
        .populate('user')
        .populate('category')
        .populate('deal')
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
                    category: toArrObject(category),
                    success : req.flash('success'),
                    error : req.flash('error')
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
        },(err, rs) => {
            if(err) console.log(err);
            else{
                req.flash('success', 'done');
                res.redirect('back');
            }
        })
    }

    //POST /product/sold
    async sold(req, res) {
        try {
            let rs = await getUrProduct(req);
            if (rs) {
                res.render('product/sold', {
                    product: toArrObject(rs),
                    page: req.body.page,
                    completed: req.body.completed
                });
            } else {
                res.status(500).json({ error: "Lỗi kết nối cơ sở dữ liệu" })
            }
        } catch (error) {
            console.log(error)
        }
    }
    //POST /product/onsale
    async onsale(req, res) {
        let rs = await getUrProduct(req);
        if (rs) {
            res.render('product/onsale', {
                product: toArrObject(rs),
                page: req.body.page,
                completed: req.body.completed
            });
        } else {
            res.status(500).json({ error: "Lỗi kết nối cơ sở dữ liệu" })
        }
    }
    //POST /product/buyed
    async buyed(req, res) {
        let rs = await getUrDeal(req);
        if (rs) {
            res.render('product/buyed', {
                product: toArrObject(rs),
                page: req.body.page,
                type: req.body.type
            });
        }
        else {
            res.status(500).json({ error: "Lỗi kết nối cơ sở dữ liệu" })
        }
    }
    //POST /product/bid
    async bid(req, res) {
        let rs = await getUrDeal(req);
        if (rs) {
            res.render('product/bid', {
                product: toArrObject(rs),
                page: req.body.page,
                type: req.body.type
            });
        }
        else {
            res.status(500).json({ error: "Lỗi kết nối cơ sở dữ liệu" })
        }
    }

    //POST /product/search
    async search(req,res){
        try {
            const categories = await getCategory(req);
            let rs = await searchProduct(req);
            if(rs){
                res.render('product/search',{
                    product : rs,
                    page : req.body.page,
                    title : req.body.title,
                    area : req.body.area,
                    category : req.body.category,
                    categories : toArrObject(categories)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    //GET /product/edit/:id
    async edit (req,res) {
        let category = await Category.find({});
        Product.findOne({_id: req.params.id})
        .then(product => {
            res.render('product/edit', {
                product : toObject(product),
                category: toArrObject(category),
                success : req.flash('success'),
                error : req.flash('error')
            })
        })
        .catch(err => console.log(err));
    }

    //POST /product/edit
    async post_edit(req, res){
        const category = await Category.find({});
        let productID = req.body.id;
        let images = [];
        if (req.files) {
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
        let objUpdate = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
        };
        if(images.length > 0){
            objUpdate.image = images
        }
        Product.updateOne({_id : productID},objUpdate,(err, rs) => {
            if(err) console.log(err);
            else{
                req.flash('success', 'done');
                res.redirect('back');
            }
        })
    }


    //POST /product/delete
    delete(req,res){
        let productID = req.body.id;
        console.log(productID)
        Product.deleteOne({_id: productID},(err) => {
            if(err){
                res.status(400).json({error: "fail"});
            }
            else{
                res.status(200).json({success: "done"});
            }
        })
    }

}

module.exports = new ProductController;