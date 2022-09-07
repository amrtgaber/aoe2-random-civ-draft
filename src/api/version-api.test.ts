import fetchMock from 'jest-fetch-mock';
import { getVersion } from './version-api';

fetchMock.enableMocks();

describe('version api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getVersion', () => {
    it('should get game version', async () => {
      fetchMock.mockResponse(
        JSON.stringify({
          id: 1,
          gameVersion: '100',
        })
      );

      const version = await getVersion();

      expect(version).toBe('100');
    });
  });
});
