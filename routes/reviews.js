import express from "express";
import { getReviewsSizeFive } from "../utils/reviewsUtils.js";
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


export default reviewRouter;