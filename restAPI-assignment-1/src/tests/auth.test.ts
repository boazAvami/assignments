import request  from 'supertest';
import app from '../main'; // Import your app
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import { Express } from "express";
import userModel, { IUser } from "../models/users_model";

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

      console.log(res.body)
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

afterAll(async () => {
  // Cleanup if necessary, for example, by deleting users.
  await request(app)
      .delete('/user/'+ userId)
    // app.close();
});
