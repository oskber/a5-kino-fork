import express from "express";
import cmsAdapter from "../src/cmsAdapt.js";
import { getReviewsSizeFive, postReview, validateReview } from "../utils/reviewsUtils.js";
import { getAverageRating } from "../utils/reviewsUtils.js";
import { imdbAdapter } from "../utils/omdbApiUtils.js";
const reviewRouter = express.Router();

reviewRouter.get('/movies/:id/reviews', async (req, res) => {
  const payload = await getReviewsSizeFive(
    cmsAdapter,
    req.params.id,
    req.query.page
  );
  res.json(payload);
});

reviewRouter.get('/movies/:id/ratings', async (req, res) => {
const payload = await getAverageRating(cmsAdapter, req.params.id, imdbAdapter);
  res.status(200).json(payload);
});

reviewRouter.post('/movies/:id/reviews', async (req, res) => {
  const validated = await validateReview(req.body);
  if (validated === false) {
    res.status(400).send({ message: 'Invalid input' });
  } else {
  await postReview(cmsAdapter, req.body);
  res.send({ message: 'Success' });
  }
});

export default reviewRouter;
