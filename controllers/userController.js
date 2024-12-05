const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { genToken } = require('../utils/genToken')
const userModel = require('../models/user-model')

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body

        let existingUser = await userModel.findOne({ email })
        if (existingUser) {
            req.flash("error", "User already exists")
            return res.redirect("/")
            
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash){
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({ 
                        email,
                        password: hash,
                        fullname
                    })
            
                    let token  = genToken(user)
                    res.cookie("token", token).send("user created successfully")

                }
            })
        })

        
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports.loginUser = async function(req, res){
    try {
        let {email, password} = req.body
        let user = await userModel.findOne({ email})
        if (!user) {
            req.flash("error","Email or password incorrect")    
            return res.redirect("/")
        }
        
        bcrypt.compare(password, user.password, function(err,result){
            if(result) {
                let token = genToken(user)
                res.cookie("token", token)
                res.redirect("/shop")
            } else {
                req.flash("error","Email or password incorrect")
                return res.redirect("/")
            }
        })
        
        
    } catch (err) {
        
    }
}

module.exports.logoutUser = async function(req, res){
    res.clearCookie("token")
    res.redirect("/")
}