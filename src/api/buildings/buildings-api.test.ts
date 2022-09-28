import fetchMock from 'jest-fetch-mock';

import { ApiBuilding, getBuildings } from './buildings-api';

export const mockApiBuildings: ApiBuilding[] = [
  {
    id: 1,
    buildingName: 'house',
    age: { id: 1, ageName: 'dark age' },
    civs: [],
    units: [],
    techs: [],
  },
  {
    id: 2,
    buildingName: 'castle',
    age: { id: 3, ageName: 'castle age' },
    civs: [],
    units: [{ id: 1000, unitName: 'petard' }],
    techs: [{ id: 1001, techName: 'conscription' }],
  },
  {
    id: 3,
    buildingName: 'stable',
    age: { id: 2, ageName: 'feudal age' },
    civs: [],
    units: [{ id: 1002, unitName: 'scout' }],
    techs: [],
  },
];

fetchMock.enableMocks();

describe('buildings api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should get and sort buildings', async () => {
    fetchMock.mockResponse(JSON.stringify(mockApiBuildings));

    const buildings = await getBuildings();

    expect(buildings[0].itemName).toBe('castle');
    expect(buildings[1].itemName).toBe('house');
    expect(buildings[2].itemName).toBe('stable');
  });
});
