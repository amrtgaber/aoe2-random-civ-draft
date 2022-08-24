import fetchMock from 'jest-fetch-mock';
import { TEST_CIVS } from '../shared-test-data';
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
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            unitName: 'skirmisher',
          },
          {
            id: 2,
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            unitName: 'archer',
          },
          {
            id: 2,
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            unitName: 'villager',
          },
        ])
      );

      const units = await getUnits();

      expect(units[0].unitName).toBe('archer');
      expect(units[1].unitName).toBe('skirmisher');
      expect(units[2].unitName).toBe('villager');
    });
  });
});
