const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        sender: { type: String, required: true },
        content: { type: String, required: true }
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
