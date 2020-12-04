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
router.post('/profile/updateinfo',requireAuth,UserController.updateInfo);
router.post('/profile/updatedes',requireAuth, UserController.updateDes);
router.post('/profile/updatepass',requireAuth, UserController.updatePass);
router.post('/profile/updateava',requireAuth, UserController.updateava);

// dashboard
router.get('/dashboard',requireAuth, userController.dashboard);

//user info
router.get('/info/:id',requireAuth, userController.info);

module.exports = router;