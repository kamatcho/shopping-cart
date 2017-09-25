var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var session = require('express-session');
var passport = require('passport');

router.get('/profile' ,isLoggedIn, function (req , res) {
    res.render('user/profile');
});
router.get('/logout', isLoggedIn,function (req , res , next) {
    console.log("logging out ......");
    req.logout();
    res.redirect('/');
});
router.use('/' , notLoggedIn , function (req , res , next) {
    next()
});

router.get('/signup', function (req , res , next) {
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken : req.csrfToken() , messages : messages , hasErrors :messages.length > 0});
});
router.post('/signup',passport.authenticate('local.signup', {
    successRedirect : '/user/profile',
    failureRedirect :'/user/signup',
    failureFlash    : true
}));


// Sign In
router.get('/signin', function (req , res , next) {
    var messages = req.flash('error');
    res.render('user/signin',{csrfToken : req.csrfToken() , messages : messages , hasErrors :messages.length > 0});
});
router.post('/signin',passport.authenticate('local.signin', {
    successRedirect : '/user/profile',
    failureRedirect :'/user/signin',
    failureFlash    : true
}));


module.exports = router;

function isLoggedIn(req , res , next) {
    if (req.isAuthenticated()) {
        console.log('test');
        return next()
    }
    res.redirect('/')
}
function notLoggedIn(req , res , next) {
    if (!req.isAuthenticated()) {
        console.log('Not Auth');
        return next()
    }
    res.redirect('/')
}
