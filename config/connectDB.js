const mongoose = require('mongoose')
const config = require('config')
const dbgr = require('debug')("development: mongoose")
require("dotenv").config();

mongoose.connect(`${process.env.MONGODB_URI}`)
.then(function(){
    console.log("connected to mongodb");
    
    dbgr("connected to MongoDB");
    
})
.catch(function(err) {
    console.log(err);
    
    dbgr("Error connecting to MongoDB: ", err);
})

module.exports = mongoose.Connection;