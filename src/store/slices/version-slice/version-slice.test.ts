import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { mockApiVersion } from '../../../api/version/version-api.test';
import { FetchStatus } from '../../fetch-status-service';

import versionReducer, { fetchVersion, versionInitialState } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: versionReducer,
});

describe('version reducer', () => {
  test('should handle initial load', () => {
    expect(versionReducer(undefined, { type: 'unkown' })).toEqual(
      versionInitialState,
    );
  });

  describe('fetch version', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    test('should fetch game version', async () => {
      fetchMock.mockResponse(JSON.stringify(mockApiVersion));

      await store.dispatch(fetchVersion());

      expect(store.getState().versionStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().gameVersion).toBe(mockApiVersion.gameVersion);
    });

    test('should set versionStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchVersion());
      expect(store.getState().versionStatus).toBe(FetchStatus.FAILED);
    });
  });
});
