import fetchMock from 'jest-fetch-mock';

import { ApiTech, getTechs } from './techs-api';

export const mockApiTechs: ApiTech[] = [
  {
    id: 1,
    techName: 'wheelbarrow',
    age: { id: 2, ageName: 'feudal age' },
    civs: [],
    buildings: [{ id: 1000, buildingName: 'town center' }],
  },
  {
    id: 2,
    techName: 'loom',
    age: { id: 1, ageName: 'dark age' },
    civs: [],
    buildings: [{ id: 1000, buildingName: 'town center' }],
  },
  {
    id: 2,
    techName: 'stone mining',
    age: { id: 2, ageName: 'feudal age' },
    civs: [],
    buildings: [{ id: 1001, buildingName: 'mining camp' }],
  },
];

fetchMock.enableMocks();

describe('techs api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should get and sort techs', async () => {
    fetchMock.mockResponse(JSON.stringify(mockApiTechs));

    const techs = await getTechs();

    expect(techs[0].itemName).toBe('loom');
    expect(techs[1].itemName).toBe('stone mining');
    expect(techs[2].itemName).toBe('wheelbarrow');
  });
});
