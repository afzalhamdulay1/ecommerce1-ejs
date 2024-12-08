const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')
const productModel = require('../models/product-model')
let userModel = require('../models/user-model')

router.get('/', function (req, res) {
   let error = req.flash("error")
   res.render("index", { error, loggedIn: false })
})

router.get('/shop', isLoggedIn, async function (req, res) {
    let products = await productModel.find()
    let success = req.flash("success")
    res.render("shop", { products, success })
})

// router.get('/cart', isLoggedIn, async function (req, res) {
//     // let user = await userModel.findOne({ email: req.user.email }).populate("cart.productId")
//     // console.log(user.cart[0].productId);

//     let user = await userModel.findOne({ email: req.user.email });
//     console.log("User cart before populate:", user.cart);

//     // Attempt to populate
//     user = await user.populate("cart.productId");
//     console.log("User cart after populate:", user.cart[0]);
    
//     res.render("cart", { user })
    
// })

// router.get('/addToCart/:productId', isLoggedIn, async function (req, res) {
//     let user = await userModel.findOne({email: req.user.email})
//     user.cart.push(req.params.productId)
//     await user.save()
//     req.flash('success', "Added to cart")
//     res.redirect('/shop')
// })

router.get('/cart', isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });

    // Populate the productId field inside the cart array
    await user.populate({
        path: "cart._id",  // Path to the field inside the cart array
        model: "Product"  // The model to populate (should be the Product model)
    });
    res.render("cart", { user });
});



router.get('/addToCart/:productId', isLoggedIn, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            req.flash('error', "User not found");
            return res.redirect('/shop');
        }

        // Prevent duplicate entries
        if (!user.cart.includes(req.params.productId)) {
            user.cart.push(req.params.productId);
            await user.save();
            req.flash('success', "Added to cart");
        } else {
            req.flash('info', "Product already in cart");
        }

        res.redirect('/shop');
    } catch (err) {
        console.error(err);
        req.flash('error', "An error occurred");
        res.redirect('/shop');
    }
});


module.exports = router