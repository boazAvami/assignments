import request from 'supertest';
import app from '../main'; // Import your app
import mongoose from 'mongoose';

let authToken: string;
let postId: string;
let commentId: string;
let userId = "";

beforeAll(async () => {
  // Register and login to get the token
  const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });
      
      userId += res.body._id;
  const resLogin = await request(app)
    .post('/auth/login')
    .send({
      email: 'testuser@example.com',
      password: 'password123',
    });

  authToken = resLogin.body.accessToken;

  // Create a post to attach comments to
  const resPost = await request(app)
    .post('/post')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      title: 'New Post Title',
      content: 'Content of the new post.',
      tags: ['Tech', 'NodeJS'],
    });

  postId = resPost.body._id;
});


describe('POST /comment', () => {
  it('should create a comment on the post', async () => {
    const res = await request(app)
      .post('/comment')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        postId,
        sender: " boaz",
        content: 'This is a comment on the post!',
      });

    expect(res.status).toBe(201);
    expect(res.body.content).toBe('This is a comment on the post!');
    commentId = res.body._id;
  });
});

describe('GET /comment/:comment_id', () => {
  it('should retrieve a comment by its ID', async () => {
    const res = await request(app)
      .get(`/comment/${commentId}`)
      .set('Authorization', `Bearer ${authToken}`);


    expect(res.status).toBe(200);
    expect(res.body._id).toBe(commentId);
  });
});

describe('DELETE /comment/:comment_id', () => {
  it('should delete a comment', async () => {
    // Ensure a comment is created before deleting it
    const res = await request(app)
      .post('/comment')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        postId,
        sender: 'boaz',
        content: 'This is a comment to be deleted!',
      });

    const commentIdToDelete = res.body._id;

    // Test the delete endpoint
    const deleteRes = await request(app)
      .delete(`/comment/${commentIdToDelete}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(deleteRes.status).toBe(200);
  });

  it('should return an error if comment does not exist', async () => {
    const res = await request(app)
      .delete('/comment/invalidCommentId')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(404);
  });
});

describe('PUT /comment/:comment_id', () => {
  it('should update a comment', async () => {
    // Ensure a comment is created before updating it
    const res = await request(app)
      .post('/comment')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        postId,
        sender: 'boaz',
        content: 'This is a comment to be updated!',
      });

    const commentIdToUpdate = res.body._id;

    // Test the update endpoint
    const updateRes = await request(app)
      .put(`/comment/${commentIdToUpdate}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'This is the updated content for the comment.',
      });

    expect(updateRes.status).toBe(200);
  });

  it('should return an error if comment does not exist', async () => {
    const res = await request(app)
      .put('/comment/invalidCommentId')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ content: 'Trying to update non-existing comment' });

    expect(res.status).toBe(400);
  });
});

afterAll(async () => {
  // Clean up created objects (post and comment)
  await request(app)
    .delete(`/post/${postId}`)
    .set('Authorization', `Bearer ${authToken}`);
  await request(app)
      .delete('/user/'+ userId)
  app.close();
  mongoose.connection.close();
});
