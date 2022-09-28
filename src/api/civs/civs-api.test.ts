import fetchMock from 'jest-fetch-mock';

import { getCivs, ICiv } from './civs-api';

export const mockApiCivs: ICiv[] = [
  {
    id: 1,
    civName: 'Vikings',
  },
  {
    id: 2,
    civName: 'Aztecs',
  },
  {
    id: 2,
    civName: 'Malians',
  },
];

fetchMock.enableMocks();

describe('civs api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should get and sort civs', async () => {
    fetchMock.mockResponse(JSON.stringify(mockApiCivs));

    const civs = await getCivs();

    expect(civs[0].civName).toBe('Aztecs');
    expect(civs[1].civName).toBe('Malians');
    expect(civs[2].civName).toBe('Vikings');
  });
});
