async function getScreenings() {
    try {
        const response = await fetch('/api/coming-screenings');
        if (!response.ok) {
            let consoleError = await response.json();
            console.log(consoleError.message);

            return;
        }
        const screenings = await response.json();

        return screenings;
    } catch (error) {
        console.error('Error getting screenings', error);
        throw error;
    }
}
class RenderScreenings {
    async showScreenings() {
        const screenings = await getScreenings();

        if (!screenings) {
            console.log('Error getting screenings');
            return;
        }
        const screeningsList = document.querySelector('.screeningList');

        screenings.forEach(screening => {
            const screeningLi = document.createElement('li');
            screeningLi.classList.add('font-semibold', 'text-xl')
            const startTime = screening.start_time.slice(0, -8);
            const startTimes = startTime.replace('T', ' ');
            screeningLi.textContent = `${screening.movie.title} - ${startTimes} - Salong: ${screening.room}`
            screeningsList.append(screeningLi);
        });
    }


}

const renderer = new RenderScreenings
renderer.showScreenings();


