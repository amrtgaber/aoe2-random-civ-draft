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
            buildingName: 'house',
            civs: [],
            units: [],
            techs: [],
          },
          {
            id: 2,
            buildingName: 'castle',
            civs: [],
            units: [],
            techs: [],
          },
          {
            id: 3,
            buildingName: 'stable',
            civs: [],
            units: [],
            techs: [],
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
