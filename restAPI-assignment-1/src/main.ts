const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const express = require('express');
import mongoose from 'mongoose';
import postsRouter from './routers/postsRouter';
import commentsRouter from './routers/commentsRout';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/post", postsRouter);
app.use("/comment", commentsRouter);

mongoose.connect(process.env.DB_C0NNECT || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
