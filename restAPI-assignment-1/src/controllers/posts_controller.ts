import { Request, Response } from "express";
import postService from "../services/postService";

export const addPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { content } = req.body;
        const userId =  req.params.userId;
        const newPost = await postService.createPost(userId, content);
        res.status(201).json(newPost);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const sender = req.query.sender as string | undefined;
        const posts = await postService.fetchAllPosts(sender);
        res.json(posts);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await postService.fetchPostById(req.params.post_id);
        res.json(post);
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { content } = req.body;
        const updatedPost = await postService.modifyPost(req.params.post_id, content);
        res.json(updatedPost);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export default {
    addPost,
    getAllPosts,
    getPostById,
    updatePost,
};
