import { API_BASE } from "../routes/api.js";
import { imdbRating } from "../utils/omdbApiUtils.js"; 
import fetch from "node-fetch";

/*Fetches all reviews for each movie from CMS then filters the data to remove
all unverified or invalid reviews. Then the function paginates the array and sets 
the pagesize to 5*/
export async function getReviewsSizeFive(id, page) {
  const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`)
  const payload = await res.json();

  const modifiedArr = payload.data.map((obj) => ({
    id: obj.id,
    ...obj.attributes
  }))

  let filteredArr = filterVerified(modifiedArr);

  filteredArr.forEach(function (obj) {
    obj.author === null ? obj.author = 'Okänd användare' : obj.author = obj.author;
    obj.author === '' ? obj.author = 'Okänd användare' : obj.author = obj.author;

    obj.comment === null ? obj.comment = '' : obj.comment = obj.comment;

    obj.rating === null ? obj.rating = '' : obj.rating = `Betyg: ${obj.rating}`;
  });

  return paginateSizeFive(page, filteredArr)
}
//Function that paginates an array into pages with size 5
export function paginateSizeFive(page, arr){
  const itemsPerPage = 5;
  const currentPage = page;
  let paginatedArr = []

  for (let i = 0; i < arr.length; i++) {
    if (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) {
      paginatedArr.push(arr[i]);
    }
  }
  return paginatedArr;
}
//Function that filters out reviews that aren't verified
export function filterVerified(arr){
    return arr.filter((obj) => {

    return obj.verified && (obj.rating || obj.rating === 0);

  })
}

//skriv här

async function getMovieReview(id) {
  const res = await fetch(`${API_BASE}/reviews?populate=movie&filters[movie]=${id}`);
  const payload = await res.json();
  const modifiedArr = payload.data.map((obj) => ({
    id: obj.id,
    ...obj.attributes
  }))
  return modifiedArr;
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

export async function getAverageRating(id, imdbId) {
  const reviewsList = await getMovieReview(id);
  const reviews = reviewsList;
  let averageRating, maxRating;
  if (reviews.length >= 5) {
    let sumRatings = 0;
    reviews.forEach((review) => {
      sumRatings += review.rating;
    }
    )
    averageRating = sumRatings / reviews.length;
    maxRating = 5;
    console.log(averageRating);
  }else {
    
  }
}