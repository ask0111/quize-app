const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const user = mongoose.Schema({
    'googleId' : String,
    'faceBookId' : String,
    'githubId' : String,
    'username' : String,
    'name' : String,
    'city' : {
        type: String,
        default: ''
    },
    'job' : {
        type: String,
        default: ''
    }
});

user.plugin(passportLocalMongoose);
user.plugin(findOrCreate);

const User = mongoose.model('userLogin', user);

module.exports = User;