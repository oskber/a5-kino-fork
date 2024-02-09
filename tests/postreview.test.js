import { describe, test, expect } from "@jest/globals";
import { validateReview } from "../utils/reviewsUtils";

describe(validateReview, () => {
  test('Expect to return false if review is not valid', async () => {
    const review = {
      "data": {
        "comment": "test",
        "rating": 5,
        "author": "",
        "verified": true,
        "movie": 5,
        "createdAt": "2024-02-09T08:25:41.221Z",
        "updatedAt": "2024-02-09T08:25:41.221Z",
        "createdBy": "",
        "updatedBy": ""
      }
    }
    const result = await validateReview(review);
    expect(result).toBe(false);
  });
});
describe(validateReview, () => {
  test('Expect to return true if review is valid', async () => {
    const review = {
      "data": {
        "comment": "test",
        "rating": 5,
        "author": "testkillen",
        "verified": true,
        "movie": 5,
        "createdAt": "2024-02-09T08:25:41.221Z",
        "updatedAt": "2024-02-09T08:25:41.221Z",
        "createdBy": "testkillen",
        "updatedBy": "testkillen"
      }
    }
    const result = await validateReview(review);
    expect(result).toBe(true);
  });
});