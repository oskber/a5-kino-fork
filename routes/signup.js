import express from 'express';

const signupRouter = express.Router();

signupRouter.get('/', async (req, res) => {
    res.render('signup');
});

export default signupRouter;