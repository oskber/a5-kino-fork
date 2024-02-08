import express from 'express';
import { fetchScreenings } from '../utils/screeningUtils.js';
import { mapScreenings } from '../utils/screeningUtils.js';
import { frontpageScreening } from '../utils/screeningUtils.js';
// import { fetchScreenings } from '../utils/screeningUtils.js';
const screeningRouter = express.Router();







screeningRouter.get('/screenings', async (req, res) => {
    try {
        const Screenings = await fetchScreenings()


        if (!Screenings) {
            res.status(404).send('Ingen data hittades')
        } else {
            res.status(200).json(Screenings);
        }
    } catch (error) {
        console.log('Error fetching screenings:', error);
        res.status(500).send('Databasen verkar inte kunna hämta data.')
    }

})


screeningRouter.get('/screenings/screeningsfrontpage', async (req, res) => {
    try {
        await frontpageScreening(res)

    } catch (error) {
        console.log('Error fetching screenings', error)
        res.status(500).send('Databasen verkar inte kunna hämta data.')

    }

})

screeningRouter.get('/screenings/screenings-details-page/movies/:id', async (req, res) => {
    const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/screenings?filters[movie]=${req.params.id}`);
    const payload = await response.json();
    res.json(payload);
});

export default screeningRouter;