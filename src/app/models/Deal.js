const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Deal = new Schema({
    //id sản phẩm
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    //id người mua hoặc đấu giá
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //id người bán
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //trả giá: trường hợp đấu giá
    auction_price: {
        type: Number,
        default : 0,
        required: true
    },
    result: {
        type: String,//pending, done, fail
        default: "pending",
        required: true
    },
    isdelete: {
        type: Boolean,
        default: false,
        required: true
    },
    //Loại deal: defaul false: trạng thái mua(không đấu giá)
    type:{
        type:Boolean,
        default: false,
        required: true
    }

}, {timestamps : true});
//time stamp: lưu thông tin createAt và modifyAt

module.exports = mongoose.model('Deal', Deal ,'deal');