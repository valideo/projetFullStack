const mongoose = require ('mongoose');

const PostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: String,
    msg: String,
    picUrl: String,
    date : Date
});

module.exports = mongoose.model('Post', PostSchema);