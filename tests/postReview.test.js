import { test, describe, expect } from "@jest/globals";
import request from 'supertest';
import app from '../src/app.js';

describe("postReview()", () => {
  test("Should return error if POST request does not include author and rating", async () => {
    await request(app)
    .post("/api/reviews")
    .send({
        "data": {
          "comment": "hej",
          "rating": "",
          "author": "",
          "verified": true,
          "movie": "8",
          "createdAt": "2024-02-05T14:21:28.776Z",
          "updatedAt": "2024-02-05T14:21:28.776Z",
          "createdBy": "",
          "updatedBy": ""
        }
    })
    .expect(400);
  })
})
describe("postReview()", () => {
  test("Should successfully post review if POST request includes author and rating", async () => {
    await request(app)
    .post("/api/reviews")
    .send({
        "data": {
          "comment": "hej",
          "rating": "5",
          "author": "Bernt",
          "verified": true,
          "movie": "8",
          "createdAt": "2024-02-05T14:21:28.776Z",
          "updatedAt": "2024-02-05T14:21:28.776Z",
          "createdBy": "Bernt",
          "updatedBy": "Bernt"
        }
    })
    .expect(200);
  })
})
