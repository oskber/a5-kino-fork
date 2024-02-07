import { API_BASE } from "../routes/api.js";
import fetch from "node-fetch";

const cmsAdapter = {
  async loadMoviesReviews(id){
    const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`)
    const payload = await res.json();
    return payload;
  }
}

export default cmsAdapter;