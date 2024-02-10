async function getScreenings() {
    try {
        const response = await fetch('/api/coming-screenings');
        const screenings = await response.json();
        return screenings;
    } catch (error) {
        console.error('Error getting screenings', error)
        throw error;
    }
}

class RenderScreenings {
    async showScreenings() {
        const screenings = await getScreenings()
        const screeningsList = document.querySelector('.screeningList')

        screenings.forEach(screening => {
            const screeningLi = document.createElement('li');
            screeningLi.style = 'font-size: 1.5rem; font-weight: bold;'
            const startTime = screening.start_time.slice(0, -8);
            const startTimes = startTime.replace('T', ' ')
            screeningLi.textContent = `${screening.movie.title} - ${startTimes} - Salong: ${screening.room}`
            screeningsList.append(screeningLi);
        });
    }


}

const renderer = new RenderScreenings
renderer.showScreenings();
