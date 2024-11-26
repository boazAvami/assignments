const commentService = require('../services/commentService');

const addComment = async (req, res) => {
    try {
        const { sender, content, postId } = req.body;
        const newComment = await commentService.createComment(sender, content, postId);
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const response = await commentService.deleteComment(req.params.comment_id);
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCommentById = async (req, res) => {
    try {
        const comment = await commentService.fetchCommentById(req.params.comment_id);
        res.json(comment);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        const updatedComment = await commentService.modifyComment(req.params.comment_id, content);
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByPostId(req.params.post_id);
        res.json(comments);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

module.exports = {
    getCommentById,
    updateComment,
    deleteComment,
    addComment,
    getCommentsByPostId
};
