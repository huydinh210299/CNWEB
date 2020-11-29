const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/CNWEB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
        });
        console.log("connect success");
    } catch (error) {
        console.log("connect fail");
    }
}

// await mongoose.connect('mongodb+srv://cnweb:huydinh2102@cluster0.t1rno.mongodb.net/cnweb?retryWrites=true&w=majority', {

module.exports = {connect};