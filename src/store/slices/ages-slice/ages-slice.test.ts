import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { mockApiAges } from '../../../api/ages/ages-api.test';
import { FetchStatus } from '../../fetch-status-service';

import agesReducer, { agesInitialState, fetchAges } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: agesReducer,
});

describe('ages reducer', () => {
  test('should handle initial load', () => {
    expect(agesReducer(undefined, { type: 'unkown' })).toEqual(
      agesInitialState
    );
  });

  describe('fetch ages', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    test('should fetch game ages', async () => {
      fetchMock.mockResponse(JSON.stringify(mockApiAges));

      await store.dispatch(fetchAges());

      expect(store.getState().agesStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allAges.length).toBe(mockApiAges.length);
    });

    test('should set agesStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchAges());
      expect(store.getState().agesStatus).toBe(FetchStatus.FAILED);
    });
  });
});
