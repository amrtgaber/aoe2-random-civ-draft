import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { FetchStatus } from '../shared-store-utils';
import versionReducer, { fetchVersion, initialState, VersionState } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: versionReducer,
});

describe('version reducer', () => {
  it('should handle initial load', () => {
    expect(versionReducer(undefined, { type: 'unkown' })).toEqual<VersionState>(
      initialState
    );
  });

  describe('fetch version', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch game version', async () => {
      fetchMock.mockResponse(
        JSON.stringify({
          id: 1,
          gameVersion: '100',
        })
      );

      await store.dispatch(fetchVersion());

      expect(store.getState().versionStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().gameVersion).toBe('100');
    });

    it('should set versionStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchVersion());
      expect(store.getState().versionStatus).toBe(FetchStatus.FAILED);
    });
  });
});
