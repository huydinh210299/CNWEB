const {toArrObject} = require('../../util/mongooes');
const {toObject} = require('../../util/mongooes');
const Product = require('../models/Product');
const userinfo = require('../../util/userinfo');
const {getCategory} = require('../../util/commonFunc');

class HomeController{

    //GET /
    async index(req ,res){
        const category = await getCategory(req);
        let userID = userinfo(req);
        if(req.cookies.jwt) req.app.locals.login = true;
        Product.find({}).populate('user')
        .where('user').ne(userID)
        .where('completed').equals(false)
        .then(product => {
            res.render('home',{
                product: toArrObject(product),
                category : toArrObject(category)
            });
        })
        .catch(err => console.log(err));
    }

}

module.exports = new HomeController;