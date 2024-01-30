import express from 'express';
import { getMovieById, getMovies } from '../utils/movieUtils.js';

const movieRouter = express.Router();

movieRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await getMovieById(id);
    if (!movie.data) {
        res.status(404);
        res.render('error', { message: `No movie with ID ${id} found` })
        return
    }
    res.render('movie', { movie: movie.data });
});

movieRouter.get('/', async (req, res) => {
    const movies = await getMovies();
    if (!movies.data) {
        res.status(404);
        res.render('error', { message: 'No movies found' })
        return
    }
    res.render('movies', { movies: movies.data });
});

export default movieRouter;