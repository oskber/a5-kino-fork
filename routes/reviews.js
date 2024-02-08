import express from 'express';
import cmsAdapter from '../src/cmsAdapt.js';
import { getReviewsSizeFive, postReview } from '../utils/reviewsUtils.js';
const reviewRouter = express.Router();

reviewRouter.get('/movies/:id/reviews/:page', async (req, res) => {
  const payload = await getReviewsSizeFive(
    cmsAdapter,
    req.params.id,
    req.params.page
  );
  res.json(payload);
});

reviewRouter.post('/reviews', async (req, res) => {
  try {
    await postReview(cmsAdapter, req.body);
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default reviewRouter;
