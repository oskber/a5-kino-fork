import express from 'express';
//import {getReviews} from "../utils/reviewsUtils.js";
import { postReview } from "../utils/reviewsUtils.js";

const apiRouter = express.Router();

export const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

apiRouter.get('/api/movies/:id/reviews/:page', async (req, res) =>{
  const payload = await getReviews(req.params.id, req.params.page)
  res.send(payload);
});

apiRouter.post('/reviews', async (req, res) => {
  const payload = await postReview(req.body);
  res.send(payload);
});

export default apiRouter;
