const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
    username : {
        type : String,
        required: true,
        unique: true,
        lowercase: true
    },
    password : {
        type: String,
        required: true,
        minlength: 6
    },
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    area:{
        type: String,
        required: true
    },
    avata:{
        type: String,
        required: false
    },
    gender:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    }
}, {timestamps : true});
//time stamp: lưu thông tin createAt và modifyAt

//Hash password trước khi lưu
User.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Phương thức kiểm tra khi login
User.statics.login = async function(username, password){
    const user = await this.findOne({username});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error("incorrect passwrord");
    };
    throw Error("incorrect username");
}

//quan hệ với product
User.virtual('product',{
    ref : 'Product',
    localField: '_id',
    foreignField: 'user'
})
//quan hệ với deal
User.virtual('deal',{
    ref : 'Deal',
    localField: '_id',
    foreignField: 'buyer'
})

User.virtual('deal',{
    ref : 'Deal',
    localField: '_id',
    foreignField: 'seller'
})

// Set Object and Json property to true. Default is set to false
User.set('toObject', { virtuals: true });
User.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', User ,'user');