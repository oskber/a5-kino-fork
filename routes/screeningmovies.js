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
    const today = new Date();
    const fiveDaysLater = new Date(today);
    fiveDaysLater.setDate(today.getDate() + 10)

    const updatedScreenings = await mapScreenings();
    const screeningDates = updatedScreenings.filter((props) => {
        const movieStartTime = new Date(props.start_time)
        return movieStartTime < fiveDaysLater && movieStartTime > today;


    })



    const maxScreenings = [];
    for (let i = 0; i < 10 && i < screeningDates.length; i++) {
        const screenObjects = screeningDates[i];
        maxScreenings.push(screenObjects);


    }
    res.json(maxScreenings);


}


screeningRouter.get('/screenings', async (req, res) => {
    const Screenings = await fetchScreenings()
    res.json(Screenings);
})




screeningRouter.get('/screenings/screeningsfrontpage', async (req, res) => {
    await frontpageScreening(res);
})









// Startsidan ska visa en lista på visningar de kommande dagarna. Listan ska laddas in med hjälp av webbläsarens fetch() EFTER att sidan har visats, d.v.s. inte renderas på servern.
// Endast visningar för de kommande fem dagarna ska visas
// Max 10 filmvisningar ska visas. Om det finns fler än 10 visningar de kommande fem dagarna ska bara så många dagar visas som resulterar i max 10 visningar.
// Ovanstående logik ska programmeras på servern, och testas med hjälp av ett enhetstest och mockade datakällor




export default screeningRouter;