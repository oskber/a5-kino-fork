import { describe, test, expect } from "@jest/globals";
import { getReviewsSizeFive } from "../utils/reviewsUtils";

describe('getReviewsSizeFive', () => {
  test('Expect an array of max five reviews', async () => {

    const mockedAdapter = {
      loadMoviesReviews: async () => ([
        mockedReview(),
        mockedReview(),
        mockedReview(),
        mockedReview(),
        mockedReview(),
        mockedReview()
      ])
    }

    const data = await getReviewsSizeFive(mockedAdapter, 'id of movie', 1);

    expect(data).toHaveLength(5);

  });

  test('Only return movie reviews with rating between 0 and 5', async () => {

    const mockedAdapter = {
      loadMoviesReviews: async () => ([
        mockedReview({ rating: 3 }),
        mockedReview({ rating: 6 }),
        mockedReview({ rating: -1 }),
        mockedReview({ rating: null })
      ])
    }

    const data = await getReviewsSizeFive(mockedAdapter, 'id of movie', 1);

    data.forEach((obj) => {
      expect(obj.rating).toBeGreaterThanOrEqual(0);
      expect(obj.rating).toBeLessThanOrEqual(5);
    })
    expect(data).toHaveLength(1)

  });

  test('Only return movie reviews that are verified(verified: true)', async () => {

    const mockedAdapter = {
      loadMoviesReviews: async () => ([
        mockedReview({ verified: false }),
        mockedReview({ verified: null }),
        mockedReview({ verified: true })
      ])
    }

    const data = await getReviewsSizeFive(mockedAdapter, 'id of movie', 1);

    data.forEach((obj) => {
      expect(obj.verified).toBe(true);
    });
    expect(data).toHaveLength(1);

  })
});

function mockedReview(attributes) {
  return {
    id: 307,
    attributes: {
      comment: "test",
      rating: 5,
      author: "test",
      verified: true,
      createdAt: "2024-02-02T14:20:22.972Z",
      updatedAt: "2024-02-02T14:20:22.972Z",
      ...attributes
    }
  }
}
