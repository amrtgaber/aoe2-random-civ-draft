import fetchMock from 'jest-fetch-mock';

import { ApiUnit, getUnits } from './units-api';

export const mockApiUnits: ApiUnit[] = [
  {
    id: 1,
    unitName: 'skirmisher',
    age: { id: 2, ageName: 'feudal age' },
    civs: [],
    buildings: [{ id: 1000, buildingName: 'archery range' }],
  },
  {
    id: 2,
    unitName: 'archer',
    age: { id: 2, ageName: 'feudal age' },
    civs: [],
    buildings: [{ id: 1000, buildingName: 'archery range' }],
  },
  {
    id: 2,
    unitName: 'villager',
    age: { id: 1, ageName: 'dark age' },
    civs: [],
    buildings: [{ id: 1001, buildingName: 'town center' }],
  },
];

fetchMock.enableMocks();

describe('units api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should get and sort units', async () => {
    fetchMock.mockResponse(JSON.stringify(mockApiUnits));

    const units = await getUnits();

    expect(units[0].itemName).toBe('archer');
    expect(units[1].itemName).toBe('skirmisher');
    expect(units[2].itemName).toBe('villager');
  });
});
