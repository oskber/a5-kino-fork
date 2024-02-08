import { API_BASE } from "../routes/api.js";
import fetch from "node-fetch";

const cmsAdapter = {
  async loadMoviesReviews(id){
    const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`)
    const payload = await res.json();
    return payload.data;
  },
  async postReview(review){
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    console.log(res)
    return res.json();
  }
}

export default cmsAdapter;