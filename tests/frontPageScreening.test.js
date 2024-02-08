import { afterEach, beforeEach, mock } from 'node:test';
import { jest } from '@jest/globals';
import { frontpageScreening } from '../utils/screeningUtils';
import { mapScreenings, fetchScreenings } from '../utils/screeningUtils';
import * as utils from '../utils/screeningUtils'
import { mockData } from './__mocks__/frontPageMockData.js'

const mockFunction = async () => {
    return new Promise((resolve, reject) => {
        resolve(mockData)
    })
}

describe('frontpageScreening', () => {

    afterEach(() => {
        jest.clearAllTimers();
    })

    // test('mapScreenings should return max 10 screenings within the next 5 days', async () => {

    //     const updatedScreenings = await mapScreenings(mockFunction)
    //     console.log(updatedScreenings);
    //     // const screeningLogic = await mockedScreenings();
    //     expect(updatedScreenings.length).toBeLessThanOrEqual(2)



    // });

    test(' frontPageScreening should only show movies within the next 5 days', async () => {
        // Arrange
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-02-05T09:00:00.000Z'))
        const today = new Date().getTime();
        let fiveDaysLater = new Date();
        fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
        fiveDaysLater = fiveDaysLater.getTime();

        // Act
        const screeningLogic = await frontpageScreening(mockFunction);
        console.log(screeningLogic);

        // Assert


        screeningLogic.forEach(screening => {
            const movieStartTime = new Date(screening.start_time).getTime();
            expect(movieStartTime).toBeGreaterThanOrEqual(today);
            expect(movieStartTime).toBeLessThan(fiveDaysLater);
        });


    })

    test('frontPageScreening shoud only show 10 movies or less.', async () => {
        //Arrange
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-02-05T09:00:00.000Z'))
        //Act
        const lengthLogic = await frontpageScreening(mockFunction);


        //Assert
        expect(lengthLogic.length).toBeLessThanOrEqual(10);
    })

});



