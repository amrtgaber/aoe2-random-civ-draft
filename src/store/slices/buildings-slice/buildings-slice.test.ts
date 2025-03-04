import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { mockApiBuildings } from '../../../api/buildings/buildings-api.test';
import { FetchStatus } from '../../fetch-status-service';

import buildingsReducer, { buildingsInitialState, fetchBuildings } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: buildingsReducer,
});

describe('buildings reducer', () => {
  test('should handle initial load', () => {
    expect(buildingsReducer(undefined, { type: 'unkown' })).toEqual(
      buildingsInitialState,
    );
  });

  describe('fetch buildings', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    test('should fetch all buildings', async () => {
      fetchMock.mockResponse(JSON.stringify(mockApiBuildings));

      await store.dispatch(fetchBuildings());

      expect(store.getState().buildingsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allBuildings.length).toBe(
        mockApiBuildings.length,
      );
    });

    test('should set buildingsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchBuildings());
      expect(store.getState().buildingsStatus).toBe(FetchStatus.FAILED);
    });
  });
});
