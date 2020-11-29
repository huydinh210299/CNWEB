const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const jsdom = require('jsdom')
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');

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

// app.use(function (req, res, next) {
//   res.locals.user = req.user
//   res.locals.authenticated = !req.user.anonymous
//   next()
// })

//template engine
app.engine('hbs',handlebars({
    extname : '.hbs',
    helpers : {
      //Hàm thực hiện so sánh giá trị
      equal : function(a,b,options) {
        if (a === b) { return options.fn(this); }
        return options.inverse(this);
      },
      notequal : function(a,b,options) {
        if (a !== b) { return options.fn(this); }
        return options.inverse(this);
      },
      isSelected: function (a, b) {
        return a === b ? 'selected' : ''; 
      },
      isActive: function (a){
        return a === 0 ? 'active' : '';
      }
    }
}))
app.set('view engine', 'hbs');
//config views
app.set('views', path.join(__dirname, 'resources' , 'views'));


//router
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})