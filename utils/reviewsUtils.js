import { API_BASE } from "../routes/api.js";
import fetch from "node-fetch";
//Get reviews for each movie and select page
export async function getReviews(id, page){
    const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}&pagination[pageSize]=5&pagination[page]=${page}`)
    const payload = await res.json();
    return payload;
}

/*app.get('/api/movies/:id/reviews/:page', async (req, res) =>{
    const payload = await getReviews(req.params.id, req.params.page)
    res.send(payload);
})*/


//Get paginated reviews "in chunks"
async function getReviewPagination(page){
    const res = await fetch(`${API_BASE}/reviews?pagination[page]=${page}`)
    const payload = await res.json()
    return payload;
}

/*app.get('/api/reviews/:page', async (req, res) => {
    const payload = await getReviewPagination( req.params.page);
    res.send(payload)

})*/

async function getReviewPageSize(size){
    const res = await fetch(`${API_BASE}/reviews?pagination[pageSize]=${size}`)
    const payload = await res.json()
    return payload;
}

/*app.get('/api/reviews/pagesize/:pageSize', async (req, res) => {
    const payload = await getReviewPageSize( req.params.pageSize); 
    res.send(payload)

})*/

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

