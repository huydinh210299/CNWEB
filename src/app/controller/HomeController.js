const {toArrObject} = require('../../util/mongooes');
const {toObject} = require('../../util/mongooes');
const Product = require('../models/Product');
const userinfo = require('../../util/userinfo');

class HomeController{

    //GET /
    index(req ,res){
        let userID = userinfo(req);
        if(req.cookies.jwt) req.app.locals.login = true;
        Product.find({}).populate('user')
        .where('user').ne(userID)
        .where('completed').equals(false)
        .then(product => {
            res.render('home',{
                product: toArrObject(product)
            });
        })
        .catch(err => console.log(err));
    }

}

module.exports = new HomeController;