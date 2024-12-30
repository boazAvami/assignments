import { Request, Response } from "express";
const express = require('express');
const router = express.Router();
import commentController from "../controllers/comments_controller";
import { authMiddleware } from "../services/authService";

/**
 * @openapi
 * /comment/{comment_id}:
 *   get:
 *     summary: Get a comment by ID
 *     description: Retrieves a comment by its unique ID.
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to retrieve
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.get('/:comment_id', authMiddleware, (req: Request, res: Response) => {
    commentController.getCommentById(req, res);
});

/**
 * @openapi
 * /comment:
 *   post:
 *     summary: Add a new comment
 *     description: Creates a new comment for a post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 example: 64af1234fda5
 *               content:
 *                 type: string
 *                 example: This is a great post!
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Bad request - validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, (req: Request, res: Response) => {
    commentController.addComment(req, res);
});

/**
 * @openapi
 * /comment/{comment_id}:
 *   put:
 *     summary: Update a comment
 *     description: Updates an existing comment by its ID.
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.put('/:comment_id', authMiddleware, (req: Request, res: Response) => {
    commentController.updateComment(req, res);
});

/**
 * @openapi
 * /comment/{comment_id}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a comment by its ID.
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:comment_id', authMiddleware, (req: Request, res: Response) => {
    commentController.deleteComment(req, res);
});

/**
 * @openapi
 * /comment/post/{post_id}:
 *   get:
 *     summary: Get all comments for a post
 *     description: Retrieves all comments associated with a specific post.
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get('/post/:post_id', authMiddleware, (req: Request, res: Response) => {
    commentController.getCommentsByPostId(req, res);
});

export default router;
