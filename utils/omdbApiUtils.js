import fetch from "node-fetch";
import { API_BASE } from "../routes/api.js";

export async function imdbRating(id) {
    const res = await fetch(`${API_BASE}/movies/${id}`);
    const payload = await res.json();
    const imdbId = payload.data.attributes.imdbId;
    const omdbApi = await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=5c14f842`);
    const omdbData = await omdbApi.json();
    return omdbData.imdbRating;
}