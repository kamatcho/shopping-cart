var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require('passport');
var Cart = require('../models/cart');
var Products = require('../models/product');


var CsrfProtextion = csurf();
router.use(CsrfProtextion);


/* GET home page. */
router.get('/', function(req, res, next) {
    Products.find(function (err , docs) {
        var productChunk = [];
        var chunkSize = 3 ;
        for (var i = 0 ; i < docs.length ; i += chunkSize) {
            productChunk.push(docs.slice(i , i + chunkSize))
        }
        res.render('shop/index', { title: 'Shopping Cart'  , products : productChunk});

    });
});

router.get('/add-to-cart/:id' , function (req , res , next) {
    var productId = req.params.id;
    // Check If The Cart Session Is Exists otherwise Pass Empty Object
    var cart = new Cart(req.session.cart ? req.session.cart : { items : {} });
    Products.findById(productId , function (err , product) {
        if (err) {
            return res.redirect('/')
        }else {
            cart.add(product , product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/')
        }
    })

});
router.get('/shop/shopping-cart' , function (req , res) {
    if (!req.session.cart){
        return res.render('shop/shopping-cart' , {product : null})
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {product : cart.generateArray() , totalPrice: cart.totalPrice})
});
module.exports = router;
