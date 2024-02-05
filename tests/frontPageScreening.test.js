import { mock } from 'node:test';
import frontpageScreening from '../utils/screeningUtils.js';
import { jest } from '@jest/globals';

describe('frontpageScreening', () => {
    test('should return max 10 screenings within the next 5 days', async () => {
        const mockResponse = {
            status: jest.fn(),
            json: jest.fn(),
            send: jest.fn(),
        };

        await frontpageScreening(mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        const returnedScreenings = mockResponse.json.mock.calls[0][0];
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