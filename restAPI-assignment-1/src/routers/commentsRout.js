const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController.js")

router.get('/:comment_id', commentController.getCommentById);
router.post('/', commentController.addComment);
router.put('/:comment_id', commentController.updateComment);
router.delete('/:comment_id', commentController.deleteComment);
router.get('/post/:post_id', commentController.getCommentsByPostId);

module.exports = router;