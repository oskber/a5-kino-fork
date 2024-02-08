import { API_BASE } from "../routes/api.js";


export async function fetchScreenings() {
    try {
        const response = await fetch(`${API_BASE}/screenings?populate=movie`);
        const screenings = await response.json();
        return screenings;
    } catch (error) {
        console.error('Error fetching screenings:', error);
        throw error;
    }
}

export async function mapScreenings() {
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

export async function frontpageScreening(res) {
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


    if ((maxScreenings.length === 0))
        res.status(404).send('ingen data hittades');
    else

        res.status(200).json(maxScreenings);
}

export default frontpageScreening;
