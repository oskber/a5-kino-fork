import express from 'express';
import { fetchScreenings } from '../utils/screeningUtils.js';
const screeningRouter = express.Router();

async function mapScreenings() {
    const allScreenings = await fetchScreenings();

    const updatedScreenings = allScreenings.data.map(properties => ({
        id: properties.id,
        start_time: new Date(properties.attributes.start_time),
        room: properties.attributes.room,

        movie: {
            id: properties.attributes.movie.data.id,
            title: properties.attributes.movie.data.attributes.title,
            intro: properties.attributes.movie.data.attributes.intro,
            image: {
                url: properties.attributes.movie.data.attributes.image.url
            },

        }
    }))

    return updatedScreenings;
}

async function frontpageScreening(res) {
    //Testa genom att sätta datum till typ 28
    const today = new Date();
    const fiveDaysLater = new Date(today);
    fiveDaysLater.setDate(today.getDate() + 5)

    const updatedScreenings = await mapScreenings();
    const screeningDates = updatedScreenings.filter((props) => {
        const movieStartTime = new Date(props.start_time)
        // Testa genom att göra tio filmer där några har visningsdatum fem dagar efter idag
        return movieStartTime < fiveDaysLater && movieStartTime > today;
    })

    const maxScreenings = [];
    for (let i = 0; i < 10 && i < screeningDates.length; i++) {
        const screenObjects = screeningDates[i];
        maxScreenings.push(screenObjects);
    }

    maxScreenings.sort((a, b) => a.start_time - b.start_time);

    if (!maxScreenings)
        res.status(404).send('ingen data hittades');
    else
        res.status(200).json(maxScreenings);
}


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



export default screeningRouter;