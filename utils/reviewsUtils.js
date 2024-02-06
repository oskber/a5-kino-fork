import { API_BASE } from '../routes/api.js';
import fetch from 'node-fetch';

//Get reviews for each movie and select page
export async function getReviewsSizeFive(id, page) {
  const res = await fetch(
    `${API_BASE}/reviews?filters[movie]=${id}&pagination[pageSize]=5&pagination[page]=${page}`
  );
  const payload = await res.json();
  return payload.data.map((obj) => ({
    id: obj.id,
    ...obj.attributes,
  }));
}

export async function postReview(review) {
  const author = review.data.author;
  const rating = review.data.rating;

  if (author && rating) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    return res.json();
  } else {
    throw new Error('Invalid review data');
  }
}
