const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
