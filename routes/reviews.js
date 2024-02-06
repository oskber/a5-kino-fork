import express from "express";
import { getReviewsSizeFive } from "../utils/reviewsUtils.js";
import { getAverageRating } from "../utils/reviewsUtils.js";
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
reviewRouter.get('/movies/:id/ratings', async (req, res) => {
 const payload = await getAverageRating(req.params.id)

  res.status(200).json(payload);
});

export default reviewRouter;