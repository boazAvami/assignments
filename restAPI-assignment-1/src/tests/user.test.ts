import request from 'supertest';
import app from '../main'; // Import your app
import mongoose from 'mongoose';

let authToken: string;
let userId: string = "";

beforeAll(async () => {
  // Register and login to get the token
  const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });
      
      userId = res.body._id;
  const resLogin = await request(app)
    .post('/auth/login')
    .send({
      email: 'testuser@example.com',
      password: 'password123',
    });

  authToken = resLogin.body.accessToken;
});



// Test for retrieving all users
describe('GET /user', () => {
  it('should retrieve all users', async () => {
    const res = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);  // Ensure the response is an array
    expect(res.body.length).toBeGreaterThan(0);  // Ensure at least one user exists
  });
});

// Test for retrieving a user by ID
describe('GET /user/:id', () => {
  it('should retrieve the user by ID', async () => {
    const res = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(userId);
    expect(res.body.username).toBe('testuser');
  });
});

// Test for updating a user
describe('PUT /user/:id', () => {
  it('should update the user details', async () => {
    const res = await request(app)
      .put(`/user/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        username: 'updateduser',
        email: 'updateduser@example.com',
      });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('updateduser');
    expect(res.body.email).toBe('updateduser@example.com');
  });
});

// Test for deleting a user
describe('DELETE /user/:id', () => {
  it('should delete the user by ID', async () => {
    const res = await request(app)
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(204);
  });
});

// Clean up after tests
afterAll(async () => {
  app.close();
  mongoose.connection.close();
});
