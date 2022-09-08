import fetchMock from 'jest-fetch-mock';
import { getTechs } from './techs-api';

fetchMock.enableMocks();

describe('techs api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getTechs', () => {
    it('should get and sort techs', async () => {
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            itemName: 'wheelbarrow',
          },
          {
            id: 2,
            itemName: 'loom',
          },
          {
            id: 2,
            itemName: 'stone mining',
          },
        ])
      );

      const techs = await getTechs();

      expect(techs[0].itemName).toBe('loom');
      expect(techs[1].itemName).toBe('stone mining');
      expect(techs[2].itemName).toBe('wheelbarrow');
    });
  });
});
