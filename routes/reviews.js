import express from "express";
import cmsAdapter from "../src/cmsAdapt.js";
import { getReviewsSizeFive, postReview } from "../utils/reviewsUtils.js";
import { getAverageRating } from "../utils/reviewsUtils.js";
const reviewRouter = express.Router();

reviewRouter.get('/movies/:id/reviews/:page', async (req, res) => {
  const payload = await getReviewsSizeFive(cmsAdapter ,req.params.id, req.params.page)
  res.json(payload);
});


reviewRouter.get('/movies/:id/ratings', async (req, res) => {
const payload = await getAverageRating(cmsAdapter, req.params.id);
  res.status(200).json(payload);
});

reviewRouter.post('/reviews', async (req, res) => {
  await postReview(cmsAdapter, req.body);
  res.send({ message: 'Success' });
});

export default reviewRouter;