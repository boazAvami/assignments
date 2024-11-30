const commentRepository = require('../repositories/commentRepository');

const createComment = async (sender, content, postId) => {
    if (!sender || !content || !postId) {
        throw new Error('Sender, content and postId are required.');
    }
    const post = await commentRepository.findPostById(postId);
    if (!post) throw new Error('Post not found');

    const comment = await commentRepository.addComment({ sender, content, postId });
    await commentRepository.addCommentToPost(postId, comment._id);

    return comment;
};

const deleteComment = async (id) => {
    const comment = await commentRepository.getCommentById(id);
    if (!comment) throw new Error('Comment not found');

    await commentRepository.deleteComment(id);
    await commentRepository.removeCommentFromPost(comment.postId, comment._id);

    return { message: 'Comment deleted successfully' };
};

const fetchCommentById = async (id) => {
    const comment = await commentRepository.getCommentById(id);
    if (!comment) {
        throw new Error('Comment not found.');
    }
    return comment;
};

const modifyComment = async (id, content) => {
    if (!content) {
        throw new Error('Content is required.');
    }
    const updatedComment = await commentRepository.updateComment(id, { content });
    if (!updatedComment) {
        throw new Error('Comment not found.');
    }
    return updatedComment;
};

const getCommentsByPostId = async (postId) => {
    const post = await commentRepository.findPostById(postId);
    if (!post) throw new Error('Post not found');

    return post.comments;
};

module.exports = {
    createComment,
    deleteComment,
    modifyComment,
    getCommentsByPostId,
    fetchCommentById,
};

