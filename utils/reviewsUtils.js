import { imdbRating } from '../utils/omdbApiUtils.js';

/*Fetches all reviews for each movie from CMS then filters the data to remove
all unverified or invalid reviews. Then the function paginates the array and sets 
the pagesize to 5*/
export async function getReviewsSizeFive(adapter, id, page) {
  const payload = await adapter.loadMoviesReviews(id);

  const modifiedArr = payload.map((obj) => ({
    id: obj.id,
    ...obj.attributes,
  }));

  let filteredArr = filterVerified(modifiedArr);

  return paginateSizeFive(page, filteredArr);
}
//Function that paginates an array into pages with size 5
export function paginateSizeFive(page, arr) {
  const itemsPerPage = 5;
  const currentPage = page;
  let paginatedArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (
      i >= (currentPage - 1) * itemsPerPage &&
      i < currentPage * itemsPerPage
    ) {
      paginatedArr.push(arr[i]);
    }
  }
  return paginatedArr;
}
//Function that filters out reviews that aren't verified

export function filterVerified(arr){
    return arr.filter((obj) => {

      return obj.verified && (obj.rating || obj.rating === 0) && 0 <= obj.rating && obj.rating <= 5;

  })
}

export async function postReview(cmsAdapter, review) {
  await cmsAdapter.postReview(review);
}

export async function getAverageRating(adapter, id) {
  const payload = await adapter.loadMoviesReviews(id);
  const modifiedArr = payload.map((obj) => ({
    id: obj.id,
    ...obj.attributes,
  }));
  let filteredReviews = filterVerified(modifiedArr);
  const imdbRes = await imdbRating(id);
  let averageRating, maxRating;
  if (filteredReviews.length >= 5) {
    let sumRatings = 0;
    filteredReviews.forEach((review) => {
      sumRatings += review.rating;
    });
    averageRating = sumRatings / filteredReviews.length;
    maxRating = 5;

    if (typeof averageRating === "number") {
      averageRating = Math.ceil(averageRating * 10) / 10;
    } else {
      averageRating = 0;
    }
  } else {
    averageRating = imdbRes;
    maxRating = 10;
  }
  return { rating: averageRating, maxRating: maxRating };
}

export async function validateReview(review) {
  if (!review.data.author || !review.data.rating) {
    return false;
  } else {
    return true;
  }
}
