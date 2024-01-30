import { test } from '@jest/globals';
import request from 'supertest';
import app from '../src/app.js';

test('Ensure that /about returns a 200 status code', async () => {
    const response = await request(app).get('/about');
    expect(response.statusCode).toBe(200);
});