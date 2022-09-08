import fetchMock from 'jest-fetch-mock';
import { TEST_CIVS } from '../../test/shared-test-data';
import { getUnits } from './units-api';

fetchMock.enableMocks();

describe('units api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getUnits', () => {
    it('should get and sort units', async () => {
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            itemName: 'skirmisher',
          },
          {
            id: 2,
            itemName: 'archer',
          },
          {
            id: 2,
            itemName: 'villager',
          },
        ])
      );

      const units = await getUnits();

      expect(units[0].itemName).toBe('archer');
      expect(units[1].itemName).toBe('skirmisher');
      expect(units[2].itemName).toBe('villager');
    });
  });
});
