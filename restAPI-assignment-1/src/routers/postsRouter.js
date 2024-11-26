const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController.js")

router.post('/', postController.addPost);
router.get('/', postController.getAllPosts);
router.get('/:post_id', postController.getPostById);
router.put('/:post_id', postController.updatePost);

module.exports = router;