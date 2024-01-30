import { test } from '@jest/globals';
import request from 'supertest';
import app from '../src/app.js';
import { getMovies } from '../utils/movieUtils.js';
const movies = await getMovies();
const highestId = Math.max(...movies.data.map((movie) => movie.id));

function decodeHtmlCharCodes(str) { 
    return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
      return String.fromCharCode(charCode);
    });
  }

test('Ensure that /movies returns a 200 status code', async () => {
    const response = await request(app).get('/movies');
    expect(response.statusCode).toBe(200);
});

test('Ensure that /movies/:id with an invalid id returns a 404 status code', async () => {
    const response = await request(app).get(`/movies/${highestId + 1}`);
    expect(response.statusCode).toBe(404);
});

for(const movie of movies.data) {
    const response = await request(app).get(`/movies/${movie.id}`);
    test(`Ensure that /movies/${movie.id} returns a 200 status code`, async () => {
        expect(response.statusCode).toBe(200);
    });
    test(`Ensure that /movies/${movie.id} has correct title`, async () => {
        expect(decodeHtmlCharCodes(response.text)).toMatch(movie.attributes.title);
    });
    test(`Ensure that /movies/${movie.id} has correct intro`, async () => {
        expect(decodeHtmlCharCodes(response.text)).toMatch(movie.attributes.intro);
    });
    test(`Ensure that /movies/${movie.id} has correct image`, async () => {
        expect(decodeHtmlCharCodes(response.text)).toMatch(movie.attributes.image.url);
    });
}