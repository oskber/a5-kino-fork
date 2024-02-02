import express from 'express';
//import {getReviews} from "../utils/reviewsUtils.js";

import reviewRouter from './reviews.js';
const apiRouter = express.Router();
export const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

apiRouter.use(reviewRouter);

export default apiRouter;
