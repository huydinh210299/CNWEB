const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const helpers = require('./util/handlebarHelpers');

//connect DB
db.connect();

//middleware
app.use(express.urlencoded({
    extended : true
}));
app.use(express.json());
//config middle ware để sử dụng các file static
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
//files upload
app.use(fileUpload());

//biến local kiểm tra trạng thái đăng nhập
app.locals.login = false;

//template engine
app.engine('hbs',handlebars({
    extname : '.hbs',
    helpers : helpers
}))
app.set('view engine', 'hbs');
//config views
app.set('views', path.join(__dirname, 'resources' , 'views'));


//router
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})