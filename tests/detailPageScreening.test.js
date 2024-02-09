import { afterEach } from 'node:test';
import { jest } from '@jest/globals';
import { movieScreening, dateHasPassed } from '../utils/screeningUtils';
import { mockData } from './__mocks__/frontPageMockData.js'

describe('detailPageScreening', () => {
    afterEach(() => {
        jest.clearAllTimers();
    })
    test('detail page should only show the upcoming screenings', async () => {
        const mockAdapter = {fetchMovieScreenings: async _ => mockData};
        const payload = await movieScreening("", mockAdapter); // vi behöver inte ID för vi har hårdkodat mockdata
        payload.forEach(screening => {
            const startTime = screening.attributes.start_time.slice(0, -8);
            const startTimes = startTime.split("T");
            expect(!dateHasPassed(new Date(startTimes[0]), startTimes[1])).toBeTruthy();
        });
    })
});



