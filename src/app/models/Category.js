const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name:{
        type: String,
        require: true
    },
    image:{
        type: String,
        required: false
    }

}, {timestamps : true});
//time stamp: lưu thông tin createAt và modifyAt

//quan hệ
Category.virtual('product',{
    ref : 'Product',
    localField: '_id',
    foreignField: 'category'
})

// Set Object and Json property to true. Default is set to false
Category.set('toObject', { virtuals: true });
Category.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Category', Category ,'category');