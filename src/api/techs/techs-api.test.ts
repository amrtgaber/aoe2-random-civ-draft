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
            techName: 'wheelbarrow',
            civs: [],
            buildings: [],
          },
          {
            id: 2,
            techName: 'loom',
            civs: [],
            buildings: [],
          },
          {
            id: 2,
            techName: 'stone mining',
            civs: [],
            buildings: [],
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
