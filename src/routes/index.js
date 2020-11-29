const homeRouter = require('./home');
const userRouter = require('./user');
const productRouter = require('./product');

function route(app){
    app.use('/' , homeRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
}

module.exports = route;