const express = require('express');
const router = express.Router();
const ownersModel = require('../models/owner-model')

router.get('/admin', function (req, res) {
    let success = req.flash('success')
    res.render('createproducts', { success })
})

// if(process.env === "development") {
//     console.log("hey");
// }

// console.log(process.env.NODE_ENV)

router.post('/create', async function (req, res) {
    let owners = await ownersModel.find()
    if(owners.length > 0) {
        return res
        .status(504)
        .send("You dont have permission to create owner")
    }

    let { fullname, email, password} = req.body

    // console.log(fullname, email, password);
    
    let createdOwner = await ownersModel.create({
        fullname,
        email,
        password
    })
    res.status(201).send(createdOwner)
})



module.exports = router