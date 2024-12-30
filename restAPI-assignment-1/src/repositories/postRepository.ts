import Post, { IPost } from "../models/posts_model";
import { Document, Types } from "mongoose";

interface PostData {
    userId: Types.ObjectId;
    content: string;
    comments?: Types.ObjectId[];
}

export const addPost = async (postData: PostData): Promise<Document<unknown, any, IPost>> => {
    const post = new Post(postData);
    return await post.save();
};

export const getAllPosts = async (filter: Record<string, unknown> = {}): Promise<IPost[]> => {
    return await Post.find(filter).populate("comments");
};

export const getPostById = async (id: string): Promise<IPost | null> => {
    return await Post.findById(id).populate("comments");
};

export const updatePost = async (id: string, data: Partial<IPost>): Promise<IPost | null> => {
    return await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export default {
    addPost,
    getAllPosts,
    getPostById,
    updatePost,
};
