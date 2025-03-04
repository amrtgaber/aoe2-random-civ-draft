import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { mockApiUnits } from '../../../api/units/units-api.test';
import { FetchStatus } from '../../fetch-status-service';

import unitsReducer, { fetchUnits, unitsInitialState } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: unitsReducer,
});

describe('units reducer', () => {
  test('should handle initial load', () => {
    expect(unitsReducer(undefined, { type: 'unkown' })).toEqual(
      unitsInitialState,
    );
  });

  describe('fetch units', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    test('should fetch all units', async () => {
      fetchMock.mockResponse(JSON.stringify(mockApiUnits));

      await store.dispatch(fetchUnits());

      expect(store.getState().unitsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allUnits.length).toBe(mockApiUnits.length);
    });

    test('should set unitsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchUnits());
      expect(store.getState().unitsStatus).toBe(FetchStatus.FAILED);
    });
  });
});
