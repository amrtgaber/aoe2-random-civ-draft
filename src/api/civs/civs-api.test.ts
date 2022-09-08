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
            civName: 'Vikings',
            units: [
              { id: 1, itemName: 'archer' },
              { id: 2, itemName: 'skirmisher' },
            ],
            techs: [
              { id: 1, itemName: 'loom' },
              { id: 2, itemName: 'wheelbarrow' },
            ],
            buildings: [
              { id: 1, itemName: 'castle' },
              { id: 2, itemName: 'house' },
            ],
          },
          {
            id: 2,
            civName: 'Aztecs',
            units: [
              { id: 1, itemName: 'archer' },
              { id: 2, itemName: 'skirmisher' },
            ],
            techs: [
              { id: 1, itemName: 'loom' },
              { id: 2, itemName: 'wheelbarrow' },
            ],
            buildings: [
              { id: 1, itemName: 'castle' },
              { id: 2, itemName: 'house' },
            ],
          },
          {
            id: 2,
            civName: 'Malians',
            units: [
              { id: 1, itemName: 'archer' },
              { id: 2, itemName: 'skirmisher' },
            ],
            techs: [
              { id: 1, itemName: 'loom' },
              { id: 2, itemName: 'wheelbarrow' },
            ],
            buildings: [
              { id: 1, itemName: 'castle' },
              { id: 2, itemName: 'house' },
            ],
          },
        ])
      );

      const civs = await getCivs();

      expect(civs[0].civName).toBe('Aztecs');
      expect(civs[1].civName).toBe('Malians');
      expect(civs[2].civName).toBe('Vikings');
    });
  });
});
