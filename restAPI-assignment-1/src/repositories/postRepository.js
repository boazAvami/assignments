const Post = require('../models/postModel');

const addPost = async (postData) => {
    const post = new Post(postData);
    return await post.save();
};

const getAllPosts = async (filter = {}) => {
    return await Post.find(filter).populate('comments');;
};

const getPostById = async (id) => {
    return await Post.findById(id).populate('comments');
};

const updatePost = async (id, data) => {
    return await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

module.exports = {
    addPost,
    getAllPosts,
    getPostById,
    updatePost
};
