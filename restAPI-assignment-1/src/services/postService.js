const postRepository = require('../repositories/postRepository');

const createPost = async (sender, content) => {
    if (!sender || !content) {
        throw new Error('Sender and content are required.');
    }
    return await postRepository.addPost({ sender, content });
};

const fetchAllPosts = async (sender) => {
    const filter = sender ? { sender } : {};
    return await postRepository.getAllPosts(filter);
};

const fetchPostById = async (id) => {
    const post = await postRepository.getPostById(id);
    if (!post) {
        throw new Error('Post not found.');
    }
    return post;
};

const modifyPost = async (id, content) => {
    if (!content) {
        throw new Error('Content is required.');
    }
    const updatedPost = await postRepository.updatePost(id, { content });
    if (!updatedPost) {
        throw new Error('Post not found.');
    }
    return updatedPost;
};

module.exports = {
    createPost,
    fetchAllPosts,
    fetchPostById,
    modifyPost
};
