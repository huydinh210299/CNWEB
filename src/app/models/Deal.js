const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Deal = new Schema({
    //id sản phẩm
    id_product: {
        type: Schema.Types.ObjectId,
        required: true
    },
    //id người mua hoặc đấu giá
    id_buyer: {
        type: Schema.Types.ObjectId,
        required: true
    },
    //trả giá: trường hợp đấu giá
    aution_price: {
        type: Number,
        required: false
    },
    result: {
        type: String,//pending, done, fail
        default: "pending",
        required: true
    },
    //trạng thái đơn hàng: thành công, thất bại
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