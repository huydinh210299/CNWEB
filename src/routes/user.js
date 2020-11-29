const express = require('express');
const UserController = require('../app/controller/UserController');
const router = express.Router();
const userController = require('../app/controller/UserController');
const {requireAuth} = require('../middleware/authMiddleware');

//login
router.get('/login', userController.login);
router.post('/login', userController.post_login);
router.get('/logged', userController.logged);
//register
router.get('/register', userController.register);
router.post('/register', userController.post_register);
//logout
router.get('/logout',requireAuth, userController.logout);

//getone
router.get('/getone',requireAuth, userController.getone);
// profile
router.get('/profile',requireAuth, userController.profile);
// dashboard
router.get('/dashboard',requireAuth, userController.dashboard);
// list product
router.get('/onsale',requireAuth, userController.onsale);
router.get('/sold',requireAuth, userController.sold);
router.get('/buyed',requireAuth, userController.buyed);
router.get('/bid',requireAuth, userController.bid);

module.exports = router;