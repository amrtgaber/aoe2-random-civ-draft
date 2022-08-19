import fetchMock from 'jest-fetch-mock';
import { getCivs } from './civs-api';

fetchMock.enableMocks();

describe('civs api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getCivs', () => {
    it('should get and sort civs', async () => {
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            civName: 'Vikings',
          },
          {
            id: 2,
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            civName: 'Aztecs',
          },
        ])
      );

      const civs = await getCivs();

      expect(civs[0].civName).toBe('Aztecs');
      expect(civs[1].civName).toBe('Vikings');
    });
  });
});
