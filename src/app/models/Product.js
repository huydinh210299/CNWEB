const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Product = new Schema({
    //tên
    name : {
        type: String,
        required: true
    },
    //giá
    price: {
        type: Number,
        required: true,
    },
    //ảnh
    image: [
        {
            type: String,
        }
    ],
    //số lượng
    quantity: {
        type: Number,
        required: true
    },
    //Tiêu đề
    title: {
        type: String,
        required: true
    },
    //mô tả
    description: {
        type: String,
        required: true
    },
    //trạng thái xóa
    isdelete: {
        type: Boolean,
        default: false,
        required: true
    },
    //trạng thái đã bán
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    //thể loại
    category:{
        type : Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //Sinh đường dẫn ngẫu nhiên
    slug : {
        type : String, 
        slug : 'name', 
        unique : true
    }

}, {timestamps : true});
//time stamp: lưu thông tin createAt và modifyAt


module.exports = mongoose.model('Product', Product ,'product');