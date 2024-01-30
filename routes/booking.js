import express from 'express';

const bookingRouter = express.Router();

bookingRouter.get('/:id', async (req, res) => {
    res.send('Soon')
});

export default bookingRouter;