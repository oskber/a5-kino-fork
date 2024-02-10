import { API_BASE } from '../routes/api.js';
import fetch from 'node-fetch';
import { postReview } from '../utils/reviewsUtils.js';
const cmsAdapter = {
  async loadMoviesReviews(id) {
    const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`);

    const payload = await res.json();
    return payload.data;
  },
  async postReview(review) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    return res.json();
  },

  async fetchScreenings() {
    try {
      let allScreenings = [];
      let page = 1;
      let totalPages = 3;

      while (page <= totalPages) {
        const url = `${API_BASE}/screenings?populate=movie&pagination[page]=${page}`;
        const response = await fetch(url);
        const screenings = await response.json();
        allScreenings = allScreenings.concat(screenings.data);
        page++;
      }
      return allScreenings;
    } catch (error) {
      console.error('Error fetching screenings:', error);
      throw error;
    }
  },
  async fetchMovieScreenings(id) {
    const response = await fetch(`${API_BASE}/screenings?filters[movie]=${id}`);
    const payload = await response.json();
    return payload;
  },
};

export default cmsAdapter;
