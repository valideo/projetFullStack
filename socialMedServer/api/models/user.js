const mongoose = require ('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type : String, required : true},
    password: {type : String, required : true},
    fName: {type : String, required : true},
    lName: {type : String, required : true},
    pseudo: {type : String, required : true},
    profilePic: {type : String, required : false},
    friendsList : {type : String},
    friendsRequestsReceived : {type : String},
    friendsRequestsSent : {type : String},
    
});

module.exports = mongoose.model('User', UserSchema);