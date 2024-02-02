import express from 'express';
//import {getReviews} from "../utils/reviewsUtils.js";
import { postReview } from '../utils/reviewsUtils.js';

import reviewRouter from './reviews.js';
const apiRouter = express.Router();
export const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

apiRouter.use(reviewRouter);

apiRouter.post('/reviews', async (req, res) => {
  const payload = await postReview(req.params.id, req.body);
  res.send(payload);
});

export default apiRouter;
