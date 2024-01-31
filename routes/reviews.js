import express from "express";
import { getReviews, getReviewsSizeFive } from "../utils/reviewsUtils.js";
const reviewRouter = express.Router();

reviewRouter.get('/movies/:id/reviews/:page', async (req, res) => {
  const payload = await getReviewsSizeFive(req.params.id, req.params.page)
  res.json(payload);
});

reviewRouter.get('/movies/:id/reviews', async (req, res) => {
  const payload = await getReviews(req.params.id)
  res.json(payload);
});


export default reviewRouter;