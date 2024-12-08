const mongoose = require('mongoose');


// const userSchema = mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true,
//         minlength: 2,
//         trim: true
//     },
//     email: String,
//     password: String,
//     orders: {
//         type: Array,
//         default: []
//     },
//     cart: [{
//         productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
//         quantity: { type: Number, required: true, default: 1 }
//     }],
//     contact: Number,
//     picture: String
// })

const userSchema = mongoose.Schema({
    fullname: { type: String, required: true, minlength: 2, trim: true },
    email: String,
    password: String,
    orders: { type: Array, default: [] },
    cart: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true, default: 1 }
    }],
    contact: Number,
    picture: String
});


module.exports = mongoose.model("User", userSchema)