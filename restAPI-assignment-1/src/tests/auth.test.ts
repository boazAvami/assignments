import request  from 'supertest';
import app from '../main'; // Import your app
import mongoose from 'mongoose';

let authToken;
let userId = "";

describe('POST /auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    userId += res.body._id;
    expect(res.body.username).toBe('testuser');
  });
});

describe('POST /auth/login', () => {
  it('should log in and return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    authToken = res.body.accessToken;
    expect(authToken).toBeDefined();
  });
});

describe('POST /auth/refresh', () => {
  it('should refresh the access token using a valid refresh token', async () => {
    // Ensure the user is logged in to get a valid refresh token
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    const refreshToken = loginRes.body.refreshToken;

    // Test the refresh endpoint
    const res = await request(app)
      .post('/auth/refresh')
      .send({ refreshToken });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
    expect(res.body._id).toBeDefined();
  });

  it('should return an error if refresh token is invalid', async () => {
    const res = await request(app)
      .post('/auth/refresh')
      .send({ refreshToken: 'invalidToken' });

    expect(res.status).toBe(400);
  });
});

describe('POST /auth/logout', () => {
  it('should log out and remove the refresh token', async () => {
    // Ensure the user is logged in to get a valid refresh token
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    const refreshToken = loginRes.body.refreshToken;

    // Test the logout endpoint
    const res = await request(app)
      .post('/auth/logout')
      .send({ refreshToken });

    expect(res.status).toBe(200);
  });

  it('should return an error if refresh token is invalid or missing', async () => {
    const res = await request(app)
      .post('/auth/logout')
      .send({ refreshToken: 'invalidToken' });

    expect(res.status).toBe(400);
  });
});



afterAll(async () => {
  // Cleanup if necessary, for example, by deleting users.
  await request(app)
      .delete('/user/'+ userId)
  app.close();
  mongoose.connection.close();
});
