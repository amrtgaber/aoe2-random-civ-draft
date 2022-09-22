import fetchMock from 'jest-fetch-mock';
import { ApiAge, getAges } from './ages-api';

fetchMock.enableMocks();

describe('ages api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getAges', () => {
    it('should get and sort ages', async () => {
      const mockAges: ApiAge[] = [
        {
          id: 1,
          ageName: 'dark age',
          units: [
            { id: 1000, unitName: 'villager' },
            { id: 1001, unitName: 'militia' },
          ],
          techs: [
            { id: 1002, techName: 'loom' },
            { id: 1003, techName: 'feudal age' },
          ],
          buildings: [
            { id: 1004, buildingName: 'lumber camp' },
            { id: 1005, buildingName: 'house' },
          ],
        },
        {
          id: 2,
          ageName: 'feudal age',
          units: [
            { id: 1006, unitName: 'archer' },
            { id: 1007, unitName: 'skirmisher' },
          ],
          techs: [
            { id: 1008, techName: 'horse collar' },
            { id: 1009, techName: 'wheelbarrow' },
          ],
          buildings: [
            { id: 1010, buildingName: 'archery range' },
            { id: 1011, buildingName: 'blacksmith' },
          ],
        },
        {
          id: 3,
          ageName: 'castle age',
          units: [
            { id: 1012, unitName: 'knight' },
            { id: 1013, unitName: 'battering ram' },
          ],
          techs: [
            { id: 1014, techName: 'hand cart' },
            { id: 1015, techName: 'ballistics' },
          ],
          buildings: [
            { id: 1016, buildingName: 'castle' },
            { id: 1017, buildingName: 'siege workshop' },
          ],
        },
      ];

      fetchMock.mockResponse(JSON.stringify(mockAges));

      const ages = await getAges();

      expect(ages[0].ageName).toBe('dark age');
      expect(ages[1].ageName).toBe('feudal age');
      expect(ages[2].ageName).toBe('castle age');
    });
  });
});
