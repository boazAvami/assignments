import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import postsRouter from './routes/postsRouter';
import commentsRouter from './routes/commentsRout';
import usersRouter from './routes/usersRoute';
import authRoutes from "./routes/authRoute";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the application',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Boaz and Shirin server',
      },
    ],
  },
  apis: ['./dist/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use("/post", postsRouter);
app.use("/comment", commentsRouter);
app.use("/user", usersRouter);
app.use("/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_C0NNECT || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Start the server
let server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

export default server;