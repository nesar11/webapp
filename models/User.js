var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
}, {timestamps: true});

var userModel = mongoose.model('User', userSchema);
module.exports = userModel;
