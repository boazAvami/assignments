import request from 'supertest';
import app from '../main'; // Import your app
import mongoose from 'mongoose';

let authToken: string;
let postId: string;
let userId = "";

beforeAll(async () => {
  // Register and login to get the token
  const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'postuser',
        email: 'postuser@example.com',
        password: 'password123',
      });
  
  userId = res.body._id;
  const resLogin = await request(app)
    .post('/auth/login')
    .send({
      email: 'postuser@example.com',
      password: 'password123',
    });

  authToken = resLogin.body.accessToken;
});

// Test for creating a new post
describe('POST /post', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/post')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'This is the content of the post.',
        tags: ['Test', 'Jest'],
      });

    expect(res.status).toBe(201);
    postId = res.body._id;
  });
});

// Test for retrieving all posts
describe('GET /post', () => {
    it('should retrieve all posts', async () => {
      const res = await request(app)
        .get('/post')
        .set('Authorization', `Bearer ${authToken}`);
  
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);  // Ensure the response is an array
      expect(res.body.length).toBeGreaterThan(0);  // Ensure at least one post exists
    });
  });

  // Test for editing a post
describe('PUT /post/:post_id', () => {
  it('should edit an existing post', async () => {
    const updatedContent = 'This is the updated content of the post.';

    const res = await request(app)
      .put(`/post/${postId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: updatedContent,
        tags: ['Updated', 'Jest'],
      });

    expect(res.status).toBe(200);
    expect(res.body.content).toBe(updatedContent);
  });
});

// Test for retrieving the created post
describe('GET /post/:post_id', () => {
  it('should retrieve the created post by ID', async () => {
    const res = await request(app)
      .get(`/post/${postId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(postId);
  });
});

describe('DELETE /post/:post_id', () => {
  it('should delete an existing post', async () => {

    console.log(" Boaz : "+ postId)

    // Delete the post
    const resDelete = await request(app)
    .delete(`/post/${postId}`)
    .set('Authorization', `Bearer ${authToken}`);


    expect(resDelete.status).toBe(200);

    // Verify that the post is actually deleted
    const resAfterDelete = await request(app)
      .get(`/post/${postId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(resAfterDelete.status).toBe(404);  // Expect a 404 as the post should be deleted
  });
});

describe('GET /post/:post_id with invalid ID', () => {
  it('should return an error if post does not exist', async () => {
    const res = await request(app)
      .get('/post/invalidPostId')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(404);
  });
});


// Clean up after tests
afterAll(async () => {
  // Delete the created post
  await request(app)
    .delete(`/post/${postId}`)
    .set('Authorization', `Bearer ${authToken}`);

  // Delete the test user
  await request(app)
    .delete(`/user/${userId}`)
    .set('Authorization', `Bearer ${authToken}`);

  app.close();
  mongoose.connection.close();
});
