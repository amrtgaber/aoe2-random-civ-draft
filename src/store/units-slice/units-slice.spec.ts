import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_CIVS } from '../../shared-test-data';
import { IUnitTechTree } from '../../api/units-api';
import { FetchStatus } from '../shared-store-utils';
import unitsReducer, {
  addUnitToFilter,
  clearUnitsFilter,
  fetchUnits,
  initialState,
  removeUnitFromFilter,
  UnitsState,
  updateUnitsFilter,
} from '.';

const TEST_UNITS: IUnitTechTree[] = [
  {
    id: 1,
    unitName: 'archer',
    civs: TEST_CIVS,
  },
  {
    id: 2,
    unitName: 'skirmisher',
    civs: TEST_CIVS,
  },
];

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
      fetchMock.mockResponse(JSON.stringify(TEST_UNITS));

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

  describe('unit filter', () => {
    it('should add unit to filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitsFilter: [],
        unitsStatus: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(startState, addUnitToFilter(TEST_UNITS[0]));

      expect(endState.unitsFilter.length).toBe(1);
    });

    it('should remove unit from filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitsFilter: [TEST_UNITS[0]],
        unitsStatus: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(
        startState,
        removeUnitFromFilter(TEST_UNITS[0])
      );

      expect(endState.unitsFilter.length).toBe(0);
    });

    it('should update filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitsFilter: [],
        unitsStatus: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(startState, updateUnitsFilter(TEST_UNITS));

      expect(endState.unitsFilter.length).toBe(2);
    });

    it('should clear unit filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitsFilter: TEST_UNITS,
        unitsStatus: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(startState, clearUnitsFilter());

      expect(endState.unitsFilter.length).toBe(0);
    });
  });
});
