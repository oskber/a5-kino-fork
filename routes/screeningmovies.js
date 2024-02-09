import express from 'express';
import { frontpageScreening, movieScreening } from '../utils/screeningUtils.js';
import cmsAdapter from '../src/cmsAdapt.js';
const screeningRouter = express.Router();


screeningRouter.get('/coming-screenings', async (req, res) => {
    try {
        const maxScreenings = await frontpageScreening(cmsAdapter)
        if ((maxScreenings.length === 0)) {
            res.status(404).send({ message: 'Hittar inga filmer' });
        }

        else
            res.status(200).json(maxScreenings);

    } catch (error) {
        console.log('Error fetching screenings', error)
        res.status(500).send({ message: 'Databasen hittar inga filmer.' })

    }

})
//Error getting screenings SyntaxError: Unexpected token 'D', "Databasen "... is not valid JSON

screeningRouter.get('/movies/:id/screenings', async (req, res) => {
    const payload = await movieScreening(req.params.id, cmsAdapter);
    res.json(payload);
});

export default screeningRouter;