import express from 'express';
const apiRouter = express.Router();
import reviewRouter from './reviews.js';
import screeningRouter from './screeningmovies.js';

export const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

apiRouter.use(screeningRouter);
apiRouter.use(reviewRouter)

export default apiRouter;
