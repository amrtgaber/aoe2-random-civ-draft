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
            unitName: 'skirmisher',
            civs: [],
            buildings: [],
          },
          {
            id: 2,
            unitName: 'archer',
            civs: [],
            buildings: [],
          },
          {
            id: 2,
            unitName: 'villager',
            civs: [],
            buildings: [],
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
