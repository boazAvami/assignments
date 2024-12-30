import mongoose from 'mongoose';
import postRepository from '../repositories/postRepository';
import { IPost } from '../models/posts_model';

const createPost = async (stringUserId: string, content: string): Promise<IPost> => {
    if (!stringUserId || !content) {
        throw new Error('Sender and content are required.');
    }

    const userId = new mongoose.Types.ObjectId(stringUserId);
    
    return await postRepository.addPost({ userId, content }) as unknown as IPost;
};

const fetchAllPosts = async (sender?: string): Promise<IPost[]> => {
    const filter = sender ? { sender } : {};
    return await postRepository.getAllPosts(filter);
};

const fetchPostById = async (id: string): Promise<IPost> => {
    const post = await postRepository.getPostById(id);
    if (!post) {
        throw new Error('Post not found.');
    }
    return post;
};

const modifyPost = async (id: string, content: string): Promise<IPost> => {
    if (!content) {
        throw new Error('Content is required.');
    }
    const updatedPost = await postRepository.updatePost(id, { content });
    if (!updatedPost) {
        throw new Error('Post not found.');
    }
    return updatedPost;
};


export default {
    createPost,
    fetchAllPosts,
    fetchPostById,
    modifyPost
};

