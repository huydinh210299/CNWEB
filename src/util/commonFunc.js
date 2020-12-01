const userinfo = require('./userinfo');
const Product = require('../app/models/Product');

//Hàm convert từ string sang boolean
const checkBoolean = (a) => {
    if(a == "true") return true;
    return false;
}

const getUrProduct = async (req) => {
    let proPerPage = 5;
    let userID = userinfo(req);
    let page = req.body.page;
    let completed = req.body.completed;//lấy trạng thái đã bán hay chưa bán: true, false
    const rs = await Product.find({user : userID})
                .where('completed').equals(checkBoolean(completed))
                .populate('deal')
                .skip(proPerPage * (page -1))
                .limit(proPerPage);
    if(rs) return rs;
    return null;
}

const getUrDeal = (req) => {
    let proPerPage = 5;
    let userID = userinfo(req);
    let page = req.body.page;
    let type = req.body.type; //Lấy type là sản phẩm đấu giá hay mua
    let result = req.body.result; //Trạng thái đã mua được chưa
}

module.exports = {getUrProduct, getUrDeal};
