let mongoose = require("mongoose");
let dotenv = require('dotenv');

dotenv.config();



mongoose.connect(process.env.DB);

let login = mongoose.Schema({
    name: String,
    location: String,
    email:String,
    password:String,
    source:String,
    date:{
        type :Date ,
        default : new Date()
    }
});

let USERS = mongoose.model('user',login);

module.exports = USERS ;