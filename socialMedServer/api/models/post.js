const mongoose = require ('mongoose');

const PostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: String,
    msg: String,
});

module.exports = mongoose.model('Post', PostSchema);