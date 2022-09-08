import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { FetchStatus } from '../shared-store-utils';
import agesReducer, { AgesState, fetchAges, initialState } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: agesReducer,
});

describe('ages reducer', () => {
  it('should handle initial load', () => {
    expect(agesReducer(undefined, { type: 'unkown' })).toEqual<AgesState>(
      initialState
    );
  });

  describe('fetch ages', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch game ages', async () => {
      fetchMock.mockResponse(
        JSON.stringify({
          id: 1,
          ageName: 'dark age',
        })
      );

      await store.dispatch(fetchAges());

      expect(store.getState().agesStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().ages.length).toBe(1);
    });

    it('should set agesStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchAges());
      expect(store.getState().agesStatus).toBe(FetchStatus.FAILED);
    });
  });
});
