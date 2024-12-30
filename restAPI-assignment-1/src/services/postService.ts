import mongoose from 'mongoose';
import postRepository from '../repositories/postRepository';
import { IPost } from '../models/posts_model';

const createPost = async (stringUserId: string, content: string): Promise<IPost> => {
    if (!stringUserId || !content) {
        throw new Error('UserId and content are required.');
    }

    const userId = new mongoose.Types.ObjectId(stringUserId);
    
    return await postRepository.addPost({ userId, content }) as unknown as IPost;
};

const fetchAllPosts = async (userId?: string): Promise<IPost[]> => {
    const filter = userId ? { userId } : {};
    return await postRepository.getAllPosts(filter);
};

const fetchPostById = async (id: string): Promise<IPost> => {
    const post = await postRepository.getPostById(id);
    if (!post) {
        throw new Error('Post not found.');
    }
    return post;
};

const modifyPost = async (userId: string, postId: string, content: string): Promise<IPost> => {
    if (!content) {
        throw new Error('Content is required.');
    }

    const post = await postRepository.getPostById(postId);
    if (!post) {
        throw new Error('Post not found.');
    }

    if(post.userId.toString() != userId){
        throw new Error('You are not authorized to modify this post.');
    }

    return await postRepository.updatePost(postId, { content }) as unknown as IPost;

};


export default {
    createPost,
    fetchAllPosts,
    fetchPostById,
    modifyPost
};

