import fetch from "node-fetch";

export async function imdbRating(imdbId) {
    const res = await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=5c14f842`);
    const payload = res.json();
    return payload;
}