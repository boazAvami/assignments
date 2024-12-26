import commentRepository from '../repositories/commentRepository';
import mongoose from 'mongoose';

interface UpdatedComment {
    _id: string;
    sender: string;
    content: string;
    postId: string;
}

const createComment = async (sender: string, content: string, stringPostId: string): Promise<UpdatedComment> => {
    if (!sender || !content || !stringPostId) {
        throw new Error('Sender, content and postId are required.');
    }
    const post = await commentRepository.findPostById(stringPostId);
    if (!post) throw new Error('Post not found');

    const postId = new mongoose.Types.ObjectId(stringPostId);

    const comment = await commentRepository.addComment({ sender, content, postId });
    await commentRepository.addCommentToPost(stringPostId, comment._id.toString());

    const commentObj = comment.toObject();
    return {
        _id: commentObj._id.toString(),
        sender: commentObj.sender,
        content: commentObj.content,
        postId: commentObj.postId.toString(),
    };
};

const deleteComment = async (id: string): Promise<{ message: string }> => {
    const comment = await commentRepository.getCommentById(id);
    if (!comment) throw new Error('Comment not found');

    await commentRepository.deleteComment(id);
    await commentRepository.removeCommentFromPost(comment.postId.toString(), comment._id.toString());

    return { message: 'Comment deleted successfully' };
};

const fetchCommentById = async (id: string): Promise<UpdatedComment> => {
    const comment = await commentRepository.getCommentById(id);
    if (!comment) {
        throw new Error('Comment not found.');
    }
    return {
        _id: comment._id.toString(),
        sender: comment.sender,
        content: comment.content,
        postId: comment.postId.toString(),
    };
};

const modifyComment = async (id: string, content: string): Promise<UpdatedComment> => {
    if (!content) {
        throw new Error('Content is required.');
    }
    const updatedComment = await commentRepository.updateComment(id, { content });
    if (!updatedComment) {
        throw new Error('Comment not found.');
    }
    return {
        _id: updatedComment._id.toString(),
        sender: updatedComment.sender,
        content: updatedComment.content,
        postId: updatedComment.postId.toString(),
    };
};

const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
    const post = await commentRepository.findPostById(postId)
    if (!post) throw new Error('Post not found');

    return post.comments as unknown as Comment[] ;
};

export default {
    createComment,
    deleteComment,
    modifyComment,
    getCommentsByPostId,
    fetchCommentById,
};


