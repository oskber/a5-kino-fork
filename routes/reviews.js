import express from 'express';
import { getReviewsSizeFive } from '../utils/reviewsUtils.js';
import { postReview } from '../utils/reviewsUtils.js';

const reviewRouter = express.Router();

reviewRouter.get('/movies/:id/reviews/:page', async (req, res) => {
  const payload = await getReviewsSizeFive(req.params.id, req.params.page);
  payload.forEach((obj) => {
    if (obj.author == null) {
      obj.author = 'Okänd';
    }
  });
  res.json(payload);
});

reviewRouter.post('/reviews', async (req, res) => {
  
  try {
    await postReview(req.body);
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(400).send({ message: error.message }); 
  }
});

export default reviewRouter;
