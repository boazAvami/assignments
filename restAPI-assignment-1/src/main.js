const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const posts_router = require("./routers/postsRouter");
const comments_router = require("./routers/commentsRout");

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use("/post", posts_router);
app.use('/comment', comments_router);

mongoose.connect(process.env.DB_C0NNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
