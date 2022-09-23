import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_UNITS } from '../../../test/shared-test-data';
import { FetchStatus } from '../../fetch-status-service';
import unitsReducer, { fetchUnits, initialState, UnitsState } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: unitsReducer,
});

describe('units reducer', () => {
  it('should handle initial load', () => {
    expect(unitsReducer(undefined, { type: 'unkown' })).toEqual<UnitsState>(
      initialState
    );
  });

  describe('fetch units', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch all units', async () => {
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            unitName: 'skirmisher',
            civs: [],
            buildings: [],
          },
          {
            id: 2,
            unitName: 'archer',
            civs: [],
            buildings: [],
          },
        ])
      );

      await store.dispatch(fetchUnits());

      expect(store.getState().unitsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allUnits.length).toBe(2);
    });

    it('should set unitsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchUnits());
      expect(store.getState().unitsStatus).toBe(FetchStatus.FAILED);
    });
  });
});
