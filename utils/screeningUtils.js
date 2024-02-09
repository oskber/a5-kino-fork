import { API_BASE } from "../routes/api.js";
import cmsAdapter from "../src/cmsAdapt.js";

export async function mapScreenings() {
    try {
        const allScreenings = await cmsAdapter.fetchScreenings();
        console.log('All Screenings:', allScreenings); // Logga datan för felsökning
        const updatedScreenings = allScreenings.map(properties => ({
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
        }));
        return updatedScreenings;
    } catch (error) {
        console.error('Error mapping screenings:', error);
        throw error;
    }
}


export async function frontpageScreening(adapter) {
    // Exempel const x = await adapter.fetchScreenings() hämta vilken property som helst från cms-adaptern.
    // console.log(x);

    const today = new Date();
    const fiveDaysLater = new Date(today);
    fiveDaysLater.setDate(today.getDate() + 5)

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

    maxScreenings.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

    return maxScreenings
}

