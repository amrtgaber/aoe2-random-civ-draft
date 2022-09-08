import fetchMock from 'jest-fetch-mock';
import { getAges } from './ages-api';

fetchMock.enableMocks();

describe('ages api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getAges', () => {
    it('should get and sort ages', async () => {
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            ageName: 'dark age',
            units: [
              { id: 1000, itemName: 'villager' },
              { id: 1001, itemName: 'militia' },
            ],
            techs: [
              { id: 1002, itemName: 'loom' },
              { id: 1003, itemName: 'feudal age' },
            ],
            buildings: [
              { id: 1004, itemName: 'lumber camp' },
              { id: 1005, itemName: 'house' },
            ],
          },
          {
            id: 2,
            ageName: 'feudal age',
            units: [
              { id: 1006, itemName: 'archer' },
              { id: 1007, itemName: 'skirmisher' },
            ],
            techs: [
              { id: 1008, itemName: 'horse collar' },
              { id: 1009, itemName: 'wheelbarrow' },
            ],
            buildings: [
              { id: 1010, itemName: 'archery range' },
              { id: 1011, itemName: 'blacksmith' },
            ],
          },
          {
            id: 3,
            ageName: 'castle age',
            units: [
              { id: 1012, itemName: 'knight' },
              { id: 1013, itemName: 'battering ram' },
            ],
            techs: [
              { id: 1014, itemName: 'hand cart' },
              { id: 1015, itemName: 'ballistics' },
            ],
            buildings: [
              { id: 1016, itemName: 'castle' },
              { id: 1017, itemName: 'siege workshop' },
            ],
          },
        ])
      );

      const ages = await getAges();

      expect(ages[0].ageName).toBe('dark age');
      expect(ages[1].ageName).toBe('feudal age');
      expect(ages[2].ageName).toBe('castle age');
    });
  });
});
