import fetchMock from 'jest-fetch-mock';
import { getBuildings } from './buildings-api';

fetchMock.enableMocks();

describe('buildings api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getBuildings', () => {
    it('should get and sort buildings', async () => {
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            itemName: 'house',
          },
          {
            id: 2,
            itemName: 'castle',
          },
          {
            id: 3,
            itemName: 'stable',
          },
        ])
      );

      const buildings = await getBuildings();

      expect(buildings[0].itemName).toBe('castle');
      expect(buildings[1].itemName).toBe('house');
      expect(buildings[2].itemName).toBe('stable');
    });
  });
});
