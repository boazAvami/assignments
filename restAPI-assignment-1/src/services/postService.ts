import postRepository from '../repositories/postRepository';

interface Post {
    _id: string;
    sender: string;
    content: string;
    comments: string[];
}

const createPost = async (sender: string, content: string): Promise<Post> => {
    if (!sender || !content) {
        throw new Error('Sender and content are required.');
    }
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

