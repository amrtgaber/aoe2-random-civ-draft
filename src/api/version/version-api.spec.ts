import fetchMock from 'jest-fetch-mock';

import { ApiVersion, getVersion } from './version-api';

export const mockApiVersion: ApiVersion = {
  id: 1,
  gameVersion: '9999',
};

fetchMock.enableMocks();

describe('version api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should get game version', async () => {
    fetchMock.mockResponse(JSON.stringify(mockApiVersion));

    const version = await getVersion();

    expect(version).toBe(mockApiVersion.gameVersion);
  });
});
