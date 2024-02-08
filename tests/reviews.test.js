import { describe, test, expect } from "@jest/globals";
import { getReviewsSizeFive } from "../utils/reviewsUtils";
import { mockedAdapt } from "./__mocks__/mockedAdapt";

describe('getReviewsSizeFive',() => {
  test('Expect an array of max five verified reviews, and expect reviews to have a rating between 0-5', async () =>{

    const data = await getReviewsSizeFive(mockedAdapt, 1, 1);

    expect(data).toHaveLength(5);

    data.forEach((obj) => {
      expect(obj.verified).toBe(true);
      expect(obj.rating).toBeGreaterThanOrEqual(0);
      expect(obj.rating).toBeLessThanOrEqual(5);

    })
  });
}); 

