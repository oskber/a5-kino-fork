import express from "express";
import { getReviewsSizeFive } from "../utils/reviewsUtils.js";
import cmsAdapter from "../src/cmsAdapt.js";
const reviewRouter = express.Router();

reviewRouter.get('/movies/:id/reviews/:page', async (req, res) => {
  const payload = await getReviewsSizeFive(cmsAdapter ,req.params.id, req.params.page)
  res.json(payload);
});

//Skriv här!


export default reviewRouter;