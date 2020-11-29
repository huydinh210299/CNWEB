const { json } = require('body-parser');
const {toArrObject} = require('../../util/mongooes');
const {toObject} = require('../../util/mongooes');
const Product = require('../models/Product');

class HomeController{

    //GET /
    index(req ,res){
        if(req.cookies.jwt) req.app.locals.login = true;
        Product.find({}).populate('user')
        .then(product => {
            res.render('home',{
                product: toArrObject(product)
            });
        })
        .catch(err => console.log(err));
    }

}

module.exports = new HomeController;