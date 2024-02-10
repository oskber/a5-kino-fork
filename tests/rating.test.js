import { getAverageRating } from "../utils/reviewsUtils.js";
import { mockedReview } from './reviews.test.js'
import { jest } from "@jest/globals";

describe("getAverageRating", () => {
    const loadMovieAdapter = {
        loadMoviesReviews: jest.fn()
    };

    const imdbAdapter = {
      imdbRating: jest.fn()
    }

    it("should return average rating from reviews if there are 5 or more", async () => {
        const reviews = [
            mockedReview({ rating: 3 }),
            mockedReview({ rating: 4 }),
            mockedReview({ rating: 5 }),
            mockedReview({ rating: 2 }),
            mockedReview({ rating: 2 }),
            mockedReview({ rating: 2 }),
        ];
        
        loadMovieAdapter.loadMoviesReviews.mockResolvedValue(reviews);
        const result = await getAverageRating(loadMovieAdapter, 1, imdbAdapter);
        expect(result.rating).toBe(3);
        expect(result.maxRating).toBe(5);
    });
    
    it("should return imdb rating if there are less than 5 reviews", async () => {
      const reviews = [
        mockedReview({ rating: 3}),
        mockedReview({ rating: 2}),
        mockedReview({ rating: 5})
      ]

      loadMovieAdapter.loadMoviesReviews.mockResolvedValue(reviews);
      imdbAdapter.imdbRating.mockResolvedValue("7.8")
      const result = await getAverageRating(loadMovieAdapter, 1, imdbAdapter);
      expect(result.rating).toBe("7.8");
      expect(result.maxRating).toBe(10);
    })
});