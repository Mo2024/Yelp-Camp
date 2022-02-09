const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const auth = require('../controllers/auth')


router.route('/register')
    .get(auth.registerPage)
    .post(catchAsync(auth.createUser));

router.route('/login')
    .get(auth.loginUser)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.postUser)

router.get('/logout', auth.logoutUser)

module.exports = router;