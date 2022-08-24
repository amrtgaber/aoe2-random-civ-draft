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
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            buildingName: 'house',
          },
          {
            id: 2,
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            buildingName: 'castle',
          },
          {
            id: 3,
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            buildingName: 'stable',
          },
        ])
      );

      const buildings = await getBuildings();

      expect(buildings[0].buildingName).toBe('castle');
      expect(buildings[1].buildingName).toBe('house');
      expect(buildings[2].buildingName).toBe('stable');
    });
  });
});
