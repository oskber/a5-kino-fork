import express from "express";
import { getReviewsSizeFive } from "../utils/reviewsUtils.js";
import { getRating } from "../utils/reviewsUtils.js";
const reviewRouter = express.Router();

reviewRouter.get('/movies/:id/reviews/:page', async (req, res) => {
  const payload = await getReviewsSizeFive(req.params.id, req.params.page)
  payload.forEach(obj => {
    if(obj.author == null){
      obj.author = 'Okänd'
    }
  });
  res.json(payload);
});

//Skriv här!
reviewRouter.get('/movies/:id/reviews/rating', async (req, res) => {
  payload = await getRating(req.params.id)

  
});

export default reviewRouter;