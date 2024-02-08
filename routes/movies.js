import express from "express";
import { getMovieById, getMovies } from "../utils/movieUtils.js";
import { getAverageRating } from "../utils/reviewsUtils.js";

const movieRouter = express.Router();

movieRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await getMovieById(id);

  const result = await getAverageRating(id);
  if (!movie.data) {
    res.status(404);
    res.render("error", { message: `No movie with ID ${id} found` });
    return;
  }

  movie.data.rating = result.rating;
  movie.data.maxRating = result.maxRating;

  res.render("movie", { movie: movie.data });
});

movieRouter.get("/", async (req, res) => {
  const movies = await getMovies();
  if (!movies.data) {
    res.status(404);
    res.render("error", { message: "No movies found" });
    return;
  }

  const moviesWithRatings = await Promise.all(
    movies.data.map(async (movie) => {
      const result = await getAverageRating(movie.id);
      return {
        ...movie,
        rating: result.rating,
        maxRating: result.maxRating,
      };
    })
  );
  res.render("movies", { movies: moviesWithRatings });
});

export default movieRouter;
