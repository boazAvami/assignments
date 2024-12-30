import { IUser } from '../models/users_model';
import postRepository from '../repositories/postRepository';
import usersRepository from '../repositories/usersRepository';

interface Post {
    _id: string;
    sender: string;
    content: string;
    comments: string[];
}

const createPost = async (senderId: string, content: string): Promise<Post> => {
    if (!senderId || !content) {
        throw new Error('Sender and content are required.');
    }
    const user = await usersRepository.getUserById(senderId) as unknown as IUser;
    const sender = user.username;
    return await postRepository.addPost({ sender, content }) as unknown as Post;
};

const fetchAllPosts = async (sender?: string): Promise<Post[]> => {
    const filter = sender ? { sender } : {};
    return await postRepository.getAllPosts(filter) as unknown as Post[];
};

const fetchPostById = async (id: string): Promise<Post> => {
    const post = await postRepository.getPostById(id) as unknown as Post;
    if (!post) {
        throw new Error('Post not found.');
    }
    return post;
};

const modifyPost = async (id: string, content: string): Promise<Post> => {
    if (!content) {
        throw new Error('Content is required.');
    }
    const updatedPost = await postRepository.updatePost(id, { content }) as unknown as Post;
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

