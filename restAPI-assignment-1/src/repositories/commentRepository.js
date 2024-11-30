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
    return await Post.findById(postId).populate('comments');
};

const addCommentToPost = async (postId, commentId) => {
    return await Post.findByIdAndUpdate(postId, { $push: { comments: commentId } });
};

  const removeCommentFromPost = async (postId, commentId) => {
    return await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
};


module.exports = {
    addComment,
    getCommentById,
    getCommentsByPostId,
    updateComment,
    deleteComment,
    findPostById,
    addCommentToPost,
    removeCommentFromPost,
};
