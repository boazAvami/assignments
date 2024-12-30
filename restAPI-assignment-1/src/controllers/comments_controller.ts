import { Request, Response } from "express";
import commentService from "../services/commentService";

export const addComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { content, postId } = req.body;
        const userId =  req.params.userId;
        const newComment = await commentService.createComment(userId, content, postId);
        res.status(201).json(newComment);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId =  req.params.userId;
        const response = await commentService.deleteComment(userId, req.params.comment_id);
        res.json(response);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getCommentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const comment = await commentService.fetchCommentById(req.params.comment_id);
        res.json(comment);
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { content } = req.body;
        const userId =  req.params.userId;
        const updatedComment = await commentService.modifyComment(userId, req.params.comment_id, content);
        res.json(updatedComment);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getCommentsByPostId = async (req: Request, res: Response): Promise<void> => {
    try {
        const comments = await commentService.getCommentsByPostId(req.params.post_id);
        res.json(comments);
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};

export default {
    addComment,
    deleteComment,
    getCommentById,
    updateComment,
    getCommentsByPostId,
};
