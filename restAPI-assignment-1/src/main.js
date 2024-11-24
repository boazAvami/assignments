const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postController = require('./controllers/postController');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
const mongoURL = 'mongodb://localhost:27017/posts_db'; // Change this to your MongoDB URL
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.post('/post', postController.addPost);
app.get('/post', postController.getAllPosts);
app.get('/post/:post_id', postController.getPostById);
app.put('/post/:post_id', postController.updatePost);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
