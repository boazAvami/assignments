import { Request, Response } from "express";
const express = require('express');
const router = express.Router();
import commentController from "../controllers/comments_controller";

router.get('/:comment_id', (req: Request, res: Response) => {
    commentController.getCommentById(req, res);
});

router.post('/', (req: Request, res: Response) => {
    commentController.addComment(req, res);
});

router.put('/:comment_id', (req: Request, res: Response) => {
    commentController.updateComment(req, res);
});

router.delete('/:comment_id', (req: Request, res: Response) => {
    commentController.deleteComment(req, res);
});

router.get('/post/:post_id', (req: Request, res: Response) => {
    commentController.getCommentsByPostId(req, res);
});

export default router;
