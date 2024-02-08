import { API_BASE } from "../routes/api.js";
import { imdbRating } from "../utils/omdbApiUtils.js"; 
import fetch from "node-fetch";

/*Fetches all reviews for each movie from CMS then filters the data to remove
all unverified or invalid reviews. Then the function paginates the array and sets 
the pagesize to 5*/
export async function getReviewsSizeFive(adapter,id, page) {
  const payload = await adapter.loadMoviesReviews(id);

  const modifiedArr = payload.data.map((obj) => ({
    id: obj.id,
    ...obj.attributes
  }))

  let filteredArr = filterVerified(modifiedArr);

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

export async function postReview(review) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    return res.json();
}

async function getMovieReview(id) {
  const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`);
  const payload = await res.json();
  const modifiedArr = payload.data.map((obj) => ({
    id: obj.id,
    ...obj.attributes
  }))
  return modifiedArr;
}

export async function getAverageRating(id) {
  const reviewsList = await getMovieReview(id);
  const imdbRes =  await imdbRating(id);
  let averageRating, maxRating;
  if (reviewsList.length >= 5) {
    let sumRatings = 0;
    reviewsList.forEach((review) => {
      sumRatings += review.rating;
    }
    )
    averageRating = sumRatings / reviewsList.length;
    maxRating = 5;
    console.log(averageRating);
  }else {
    averageRating = imdbRes;
    maxRating = 10;
  }
  let results = {
    rating: averageRating,
    maxRating: maxRating,
  }
  return results;
}