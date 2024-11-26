const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

const addComment = async (commentData) => {
    const comment = new Comment(commentData);
    return await comment.save();
};

const getCommentById = async (id) => {
    return await Comment.findById(id);
};

const getCommentsByPostId = async (postId) => {
    return await Comment.find({ postId });
};

const updateComment = async (id, data) => {
    return await Comment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteComment = async (id) => {
    return await Comment.findByIdAndDelete(id);
};

const findPostById = async (postId) => {
    const post = await Post.findById(postId);
    return post.populate('comments');
  }

module.exports = {
    addComment,
    getCommentById,
    getCommentsByPostId,
    updateComment,
    deleteComment,
    findPostById,
};
