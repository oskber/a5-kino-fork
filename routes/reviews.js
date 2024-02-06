import express from "express";
import { getReviewsSizeFive, postReview } from "../utils/reviewsUtils.js";
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

reviewRouter.post('/reviews', async (req, res) => {
  await postReview(req.body);
  res.send({ message: 'Success' });
});

export default reviewRouter;