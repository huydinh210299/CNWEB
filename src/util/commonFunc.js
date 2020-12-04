const userinfo = require('./userinfo');
const Product = require('../app/models/Product');
const Deal = require('../app/models/Deal');
const Category = require('../app/models/Category');
const mongoose =  require('mongoose');
const { toArrObject } = require('./mongooes');

//Hàm convert từ string sang boolean
const checkBoolean = (a) => {
    if (a == "true") return true;
    return false;
}

const getUrProduct = async (req) => {
    try {
        let proPerPage = 5;
        let userID = userinfo(req);
        let page = req.body.page;
        let completed = req.body.completed;//lấy trạng thái đã bán hay chưa bán: true, false
        const rs = await Product.find({ user: userID })
            .where('completed').equals(checkBoolean(completed))
            .populate('deal')
            .skip(proPerPage * (page - 1))
            .limit(proPerPage);
        if (rs) return rs;
        return null;
    } catch (error) {
        console.log(error)
    }
}

const getUrDeal = async (req) => {
    try {
        let proPerPage = 5;
        let userID = userinfo(req);
        let page = req.body.page;
        let type = req.body.type; //Lấy type là sản phẩm đấu giá hay mua
        // let result = req.body.result; //Trạng thái đã mua được chưa
        const rs = await Deal.find({ buyer: userID })
            .where('type').equals(checkBoolean(type))
            .populate('product')
            .skip(proPerPage * (page - 1))
            .limit(proPerPage);
        if (rs) return rs;
        return null;
    } catch (error) {
        console.log(error)
    }
}

const searchProduct = async (req) => {
    try {
        let proPerPage = 10;
        let userID = userinfo(req);
        let page = req.body.page;
        let title = req.body.title;
        let category = req.body.category;
        let area = req.body.area;

        let userQuery = {
            user: { $ne : mongoose.Types.ObjectId(userID) },
            completed : false
        }
        let productQuery = {};
        let categoryQuery = {};
        let areaQuery = {};

        if (title && title !== "") {
            productQuery = {
                title: { "$regex": title, "$options": "i" },
                //query contain lowercase
            }
        }
        if (category && category !== "") {
            categoryQuery = {
                "category.name": category
            }
        }
        if (area && area !== "") {
            areaQuery = {
                "seller.area": area
            }
        }

        let rs = await Product.aggregate()
            .match(productQuery)
            .match(userQuery)
            .lookup({
                from: "category",
                localField: "category",
                foreignField: "_id",
                as: "category"
            })
            .lookup({
                from: 'user',
                localField: "user",
                foreignField: "_id",
                as: "seller"
            })
            .match(categoryQuery)
            .match(areaQuery)
            .skip(proPerPage * (page - 1))
            .limit(proPerPage)
        return rs;
    } catch (error) {
        console.log(error)
    }
}

const getCategory = async (req) => {
    try {
        return await Category.find({});
    } catch (error) {
        console.log(error)
    }
}

//Hàm lấy thông tin số lượng các sản phẩm
const getAmount = async (req) => {
    let userID = userinfo(req);
    let sold = await Product.find({
        user : userID,
        completed : true
    }).count();
    let onsale = await Product.find({
        user : userID,
        completed : false
    }).count();
    let buyed = await Deal.find({
        buyer : userID,
        type: false
    }).count();
    let bid = await Deal.find({
        buyer : userID,
        type: true
    }).count();
    const data = {
        sold : sold,
        onsale : onsale,
        buyed: buyed,
        bid : bid
    }
    return data;
}

module.exports = { getUrProduct, getUrDeal, getCategory, searchProduct, getAmount};
