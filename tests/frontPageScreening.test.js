import { afterEach, beforeEach, mock } from 'node:test';
import { mockedScreenings } from './mockfrontpagescreenings';
import { jest } from '@jest/globals';
import frontpageScreening from '../utils/screeningUtils';

describe('frontpageScreening', () => {

    afterEach(() => {
        jest.clearAllTimers();
    })

    test('should return max 10 screenings within the next 5 days', async () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-02-05T09:00:00.000Z'))

        // const returnedScreenings = await mockedScreenings();
        const returnedScreenings = mockedScreenings();

        expect(returnedScreenings).toHaveLength(10);

        const today = new Date().getTime();
        let fiveDaysLater = new Date();
        fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
        fiveDaysLater = fiveDaysLater.getTime();

        returnedScreenings.forEach(screening => {
            const movieStartTime = new Date(screening.start_time).getTime();
            expect(movieStartTime).toBeGreaterThanOrEqual(today);
            expect(movieStartTime).toBeLessThan(fiveDaysLater);
        });

    });
});