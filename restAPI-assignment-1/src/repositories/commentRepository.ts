import Comment, { IComment } from "../models/comments_model";
import Post, { IPost } from "../models/posts_model";
import { Document, Types } from "mongoose";

interface CommentData {
    sender: string;
    content: string;
    postId: Types.ObjectId;
}

export const addComment = async (commentData: CommentData): Promise<Document<unknown, any, IComment>> => {
    const comment = new Comment(commentData);
    return await comment.save();
};

export const getCommentById = async (id: string): Promise<IComment | null> => {
    return await Comment.findById(id);
};

export const getCommentsByPostId = async (postId: string): Promise<IComment[]> => {
    return await Comment.find({ postId });
};

export const updateComment = async (id: string, data: Partial<IComment>): Promise<IComment | null> => {
    return await Comment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteComment = async (id: string): Promise<IComment | null> => {
    return await Comment.findByIdAndDelete(id);
};

export const findPostById = async (postId: string): Promise<IPost | null> => {
    return await Post.findById(postId).populate("comments");
};

export const addCommentToPost = async (postId: string, commentId: string): Promise<IPost | null> => {
    return await Post.findByIdAndUpdate(postId, { $push: { comments: commentId } }, { new: true });
};

export const removeCommentFromPost = async (postId: string, commentId: string): Promise<IPost | null> => {
    return await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } }, { new: true });
};

export default {
    addComment,
    getCommentById,
    getCommentsByPostId,
    updateComment,
    deleteComment,
    findPostById,
    addCommentToPost,
    removeCommentFromPost,
};
