const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/notedata",{useNewUrlParser:true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",function(){
    console.log("connect successful")
})

module.exports = db;