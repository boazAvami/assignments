import { Request, Response } from "express";
const express = require('express');
const router = express.Router();
import postController from "../controllers/posts_controller";
import { authMiddleware } from "../services/authService";

/**
 * @openapi
 * /post:
 *   post:
 *     summary: Create a new post
 *     description: Adds a new post to the platform.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: This is the content of the post.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Tech", "NodeJS"]
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized - invalid token
 */
router.post('/', authMiddleware, (req: Request, res: Response) => {
    postController.addPost(req, res);
});

/**
 * @openapi
 * /post:
 *   get:
 *     summary: Retrieve all posts
 *     description: Fetches a list of all posts.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       401:
 *         description: Unauthorized - invalid token
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, (req: Request, res: Response) => {
    postController.getAllPosts(req, res);
});

/**
 * @openapi
 * /post/{post_id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieves a specific post using its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized - invalid token
 */
router.get('/:post_id', authMiddleware, (req: Request, res: Response) => {
    postController.getPostById(req, res);
});

/**
 * @openapi
 * /post/{post_id}:
 *   put:
 *     summary: Update a post
 *     description: Modifies an existing post by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Post Title
 *               content:
 *                 type: string
 *                 example: Updated content for this post.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Updated", "NodeJS"]
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized - invalid token
 */
router.put('/:post_id', authMiddleware, (req: Request, res: Response) => {
    postController.updatePost(req, res);
});

export default router;
