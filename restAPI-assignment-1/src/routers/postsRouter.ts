import { Request, Response } from "express";
const express = require('express');
const router = express.Router();
import postController from "../controllers/posts_controller";

router.post('/', (req: Request, res: Response) => {
    postController.addPost(req, res);
});

router.get('/', (req: Request, res: Response) => {
    postController.getAllPosts(req, res);
});

router.get('/:post_id', (req: Request, res: Response) => {
    postController.getPostById(req, res);
});

router.put('/:post_id', (req: Request, res: Response) => {
    postController.updatePost(req, res);
});

export default router;
