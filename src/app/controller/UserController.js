const User = require('../models/User');
const { toArrObject } = require('../../util/mongooes');
const { toObject } = require('../../util/mongooes');
const jwt = require('jsonwebtoken');
const userinfo = require('../../util/userinfo');
const path = require('path');
const area = require('../../util/tinhthanh');
const maxAge = 3 * 24 * 60 * 60; //Thời gian sống của cookie
const dirupload = path.join(__dirname,'..','..','public','upload','avatar');

class UserController {

    //GET /user/login
    login(req, res) {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, 'my secret key', (err, decodedToken) => {
                if (err) {
                    res.render('user/login', {layout: false});
                }
                else {
                    console.log(decodedToken);
                    res.render('user/logged');
                }
            })
        }
        else {
            res.render('user/login', {layout: false});
        }
    }

    //POST /user/login
    async post_login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.login(username, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({ user: user._id });
            req.app.locals.login = true;
        } catch (error) {
            res.status(400)({error : "Tài khoản hoặc mật khẩu không đúng"});
        }
    }

    //GET /user/register
    register(req, res) {
        res.render('user/register',{layout: false});
    }

    //POST /user/register
    post_register(req, res) {
        if(req.files.avata){
            let avata = req.files.avata;
            let filename = avata.name;
            avata.mv(`${dirupload}/${filename}`,(err) => {
                console.log(err);
            });
            User.create({
                username : req.body.username,
                password : req.body.password,
                fullname : req.body.fullname,
                phone : req.body.phone,
                email : req.body.email,
                address : req.body.address,
                area : req.body.area,
                avata : `${filename}`,
                dob : req.body.dob,
                gender : req.body.gender,
                description : req.body.description
            })
            .then(res.render('user/register',{
                layout : false,
                data: {
                    success : 'Tạo tài khoản mới thành công!'
                }
            }))
            .catch(err => {
                res.render('user/register',{
                    layout : false,
                    data: {
                        error : 'Tạo tài khoản mới thành công!'
                    }
                })
            })
        }
        else{
            User.create({
                username : req.body.username,
                password : req.body.password,
                fullname : req.body.fullname,
                phone : req.body.phone,
                email : req.body.email,
                address : req.body.address,
                area : req.body.area,
                dob : req.body.dob,
                gender : req.body.gender,
                description : req.body.description
            })
            .then(res.render('/user/register',{
                layout : false,
                success : 'Tạo tài khoản mới thành công!'
            }))
            .catch(err => {
                res.render('/user/register',{
                    layout : false,
                    error : 'Tạo tài khoản mới thành công!'
                })
            })
        }
    }

    //GET /user/logged
    logged(req,res){
        res.render('user/logged');
    }

    //GET /user/logout
    logout(req,res){
        req.app.locals.login = false;
        res.clearCookie('jwt');
        res.redirect('/');
    }

    //GET /user/getone get last
    async getone(req, res){
        // User.findOne().then(rs => {
        //     res.json(toObject(rs));
        // })
        // .catch(err => console.log(err));
        var rs = await User.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
        res.json(toObject(rs));
    }

    //GET /user/profile
    profile(req, res) {
        let userID = userinfo(req);
        User.findById(userID)
        .then( user => 
            res.render("user/profile",{
                user : toObject(user),
                area : area
            })
        )
        .catch(err => {
            console.log(err);
        })
    }

    //GET /user/dashboard
    dashboard(req, res) {
        res.render("user/dashboard");
    }

    //GET /user/onsale
    onsale(req, res) {
        res.render('user/onsale');
    }
    //GET /user/sold
    sold(req, res) {
        res.render('user/sold');
    }
    //GET /user/buyed
    buyed(req, res) {
        res.render('user/buyed');
    }
    //GET /user/bid
    bid(req, res) {
        res.render('user/bid');
    }
}

//Hàm sinh token
const createToken = (id) => {
    return jwt.sign({ id }, 'my secret key', {
        expiresIn: maxAge
    })
}

module.exports = new UserController;