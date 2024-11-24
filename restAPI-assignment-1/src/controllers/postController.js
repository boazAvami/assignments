const postService = require('../services/postService');

const addPost = async (req, res) => {
    try {
        const { sender, content } = req.body;
        const newPost = await postService.createPost(sender, content);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const sender = req.query.sender;
        const posts = await postService.fetchAllPosts(sender);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await postService.fetchPostById(req.params.post_id);
        res.json(post);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { content } = req.body;
        const updatedPost = await postService.modifyPost(req.params.post_id, content);
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    addPost,
    getAllPosts,
    getPostById,
    updatePost
};
