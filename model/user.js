var mongoose = require('mongoose');
var user = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    avatar:{
        type: String,
        default: '../images/avatar1.jpg'
    }
},{versionKey:false,timestamps:{createdAt:"createtime",updatedAt:"updatetime"}});

module.exports = mongoose.model('user',user);