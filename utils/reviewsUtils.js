import { API_BASE } from "../routes/api.js";
import fetch from "node-fetch";


//Get reviews for each movie and select page
export async function getReviewsSizeFive(id, page){
  const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}&pagination[pageSize]=5&pagination[page]=${page}`)
  const payload = await res.json();
    return payload.data.map((obj) => ({
    id: obj.id,
    ...obj.attributes
  }));
}

//skriv här

async function getMovieReview(id) {
  const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`);
  const payload = await res.json();
  return payload;
}

// async function get(id) {
//     const res = await fetch(`${API_BASE}/reviews?populate=movie&filters[movie]=${id}`);
//     const payload = await res.json();
//     const modified = payload.data.map((obj) => ({
//       id: obj.id,
//       ...obj.attributes
//     }));
//     return modified;
// }

export async function getAverageRating(id) {
  const reviews = await getMovieReview(id);
  if (reviews.length >= 5) {

  }
}