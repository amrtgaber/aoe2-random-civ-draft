import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { mockApiUnits } from '../../../api/units/units-api.spec';
import { FetchStatus } from '../../fetch-status-service';

import unitsReducer, { fetchUnits, unitsInitialState } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: unitsReducer,
});

describe('units reducer', () => {
  it('should handle initial load', () => {
    expect(unitsReducer(undefined, { type: 'unkown' })).toEqual(
      unitsInitialState
    );
  });

  describe('fetch units', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch all units', async () => {
      fetchMock.mockResponse(JSON.stringify(mockApiUnits));

      await store.dispatch(fetchUnits());

      expect(store.getState().unitsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allUnits.length).toBe(mockApiUnits.length);
    });

    it('should set unitsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchUnits());
      expect(store.getState().unitsStatus).toBe(FetchStatus.FAILED);
    });
  });
});
