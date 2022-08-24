import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_CIVS } from '../../shared-test-data';
import { IUnitTechTree } from '../../api/units-api';
import unitsReducer, {
  addUnitToAllFilter,
  addUnitToAnyFilter,
  clearAllFilter,
  clearAnyFilter,
  clearFilters,
  FetchStatus,
  fetchUnits,
  initialState,
  removeUnitFromAllFilter,
  removeUnitFromAnyFilter,
  UnitsState,
  updateUnitAllFilter,
  updateUnitAnyFilter,
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

      expect(store.getState().status).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allUnits.length).toBe(2);
    });

    it('should set status to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchUnits());
      expect(store.getState().status).toBe(FetchStatus.FAILED);
    });
  });

  describe('unit all filter', () => {
    it('should add unit to all filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitAllFilter: [],
        unitAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(
        startState,
        addUnitToAllFilter(TEST_UNITS[0])
      );

      expect(endState.unitAllFilter.length).toBe(1);
    });

    it('should remove unit from all filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitAllFilter: [TEST_UNITS[0]],
        unitAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(
        startState,
        removeUnitFromAllFilter(TEST_UNITS[0])
      );

      expect(endState.unitAllFilter.length).toBe(0);
    });

    it('should update all filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitAllFilter: [],
        unitAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(
        startState,
        updateUnitAllFilter(TEST_UNITS)
      );

      expect(endState.unitAllFilter.length).toBe(2);
    });

    it('should clear all filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitAllFilter: TEST_UNITS,
        unitAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(startState, clearAllFilter());

      expect(endState.unitAllFilter.length).toBe(0);
    });
  });

  describe('unit any filter', () => {
    it('should add unit to any filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitAllFilter: [],
        unitAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(
        startState,
        addUnitToAnyFilter(TEST_UNITS[0])
      );

      expect(endState.unitAnyFilter.length).toBe(1);
    });

    it('should remove unit from any filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitAllFilter: [],
        unitAnyFilter: [TEST_UNITS[0]],
        status: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(
        startState,
        removeUnitFromAnyFilter(TEST_UNITS[0])
      );

      expect(endState.unitAnyFilter.length).toBe(0);
    });

    it('should update any filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitAllFilter: [],
        unitAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(
        startState,
        updateUnitAnyFilter(TEST_UNITS)
      );

      expect(endState.unitAnyFilter.length).toBe(2);
    });

    it('should clear any filter', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitAllFilter: [],
        unitAnyFilter: TEST_UNITS,
        status: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(startState, clearAnyFilter());

      expect(endState.unitAnyFilter.length).toBe(0);
    });
  });

  describe('clear filters', () => {
    it('should clear all the filters', () => {
      const startState: UnitsState = {
        allUnits: TEST_UNITS,
        unitAllFilter: [TEST_UNITS[0]],
        unitAnyFilter: [TEST_UNITS[1]],
        status: FetchStatus.FULFILLED,
      };

      const endState = unitsReducer(startState, clearFilters());

      expect(endState.unitAllFilter.length).toBe(0);
      expect(endState.unitAllFilter.length).toBe(0);
    });
  });
});
