const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'my secret key', (err, decodedToken) => {
            if(err){
                res.redirect('/user/login');
            }
            else{
                // console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/user/login');
    }
}

module.exports = {requireAuth};