const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        sender: {
          type: String,
          required: true,
          trim: true
        },
        content: {
          type: String,
          required: true,
          trim: true
        },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
      },
      {
        timestamps: true
      }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
