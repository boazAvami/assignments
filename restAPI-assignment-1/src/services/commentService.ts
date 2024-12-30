import { IComment } from '../models/comments_model';
import commentRepository from '../repositories/commentRepository';
import mongoose from 'mongoose';

const createComment = async (stringUserId: string, content: string, stringPostId: string): Promise<IComment> => {
    if (!stringUserId || !content || !stringPostId) {
        throw new Error('Sender, content and postId are required.');
    }

    const post = await commentRepository.findPostById(stringPostId);
    if (!post) throw new Error('Post not found');

    const postId = new mongoose.Types.ObjectId(stringPostId);
    const userId = new mongoose.Types.ObjectId(stringUserId);

    const comment = await commentRepository.addComment({ userId, content, postId }) as unknown as IComment;
    await commentRepository.addCommentToPost(stringPostId, comment._id as unknown as string);

    return comment;
};

const deleteComment = async (id: string): Promise<{ message: string }> => {
    const comment = await commentRepository.getCommentById(id);
    if (!comment) throw new Error('Comment not found');

    await commentRepository.deleteComment(id);
    await commentRepository.removeCommentFromPost(comment.postId.toString(), comment._id as unknown as string);

    return { message: 'Comment deleted successfully' };
};

const fetchCommentById = async (id: string): Promise<IComment> => {
    const comment = await commentRepository.getCommentById(id);
    if (!comment) {
        throw new Error('Comment not found.');
    }
    
   return comment;
};

const modifyComment = async (id: string, content: string): Promise<IComment> => {
    if (!content) {
        throw new Error('Content is required.');
    }
    const updatedComment = await commentRepository.updateComment(id, { content });
    if (!updatedComment) {
        throw new Error('Comment not found.');
    }
    return updatedComment;
};

const getCommentsByPostId = async (postId: string): Promise<IComment[]> => {
    const post = await commentRepository.findPostById(postId)
    if (!post) throw new Error('Post not found');

    return post.comments as unknown as IComment[];
};

export default {
    createComment,
    deleteComment,
    modifyComment,
    getCommentsByPostId,
    fetchCommentById,
};


