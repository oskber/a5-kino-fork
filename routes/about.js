import express from 'express';

const aboutRouter = express.Router();

aboutRouter.get('/', async (req, res) => {
    res.render('about');
});

export default aboutRouter;