const homeRouter = require('./home');
const userRouter = require('./user');
const productRouter = require('./product');
const dealRouter = require('./deal');

function route(app){
    app.use('/' , homeRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/deal', dealRouter);
}

module.exports = route;