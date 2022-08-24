import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_CIVS } from '../../shared-test-data';
import { IBuildingTechTree } from '../../api/buildings-api';
import buildingsReducer, {
  addBuildingToAllFilter,
  addBuildingToAnyFilter,
  BuildingsState,
  clearAllFilter,
  clearAnyFilter,
  clearFilters,
  fetchBuildings,
  FetchStatus,
  initialState,
  removeBuildingFromAllFilter,
  removeBuildingFromAnyFilter,
  updateBuildingAllFilter,
  updateBuildingAnyFilter,
} from '.';

const TEST_BUILDINGS: IBuildingTechTree[] = [
  {
    id: 1,
    buildingName: 'house',
    civs: TEST_CIVS,
  },
  {
    id: 2,
    buildingName: 'castle',
    civs: TEST_CIVS,
  },
];

fetchMock.enableMocks();

const store = configureStore({
  reducer: buildingsReducer,
});

describe('buildings reducer', () => {
  it('should handle initial load', () => {
    expect(
      buildingsReducer(undefined, { type: 'unkown' })
    ).toEqual<BuildingsState>(initialState);
  });

  describe('fetch buildings', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch all buildings', async () => {
      fetchMock.mockResponse(JSON.stringify(TEST_BUILDINGS));

      await store.dispatch(fetchBuildings());

      expect(store.getState().status).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allBuildings.length).toBe(2);
    });

    it('should set status to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchBuildings());
      expect(store.getState().status).toBe(FetchStatus.FAILED);
    });
  });

  describe('building all filter', () => {
    it('should add building to all filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingAllFilter: [],
        buildingAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(
        startState,
        addBuildingToAllFilter(TEST_BUILDINGS[0])
      );

      expect(endState.buildingAllFilter.length).toBe(1);
    });

    it('should remove building from all filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingAllFilter: [TEST_BUILDINGS[0]],
        buildingAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(
        startState,
        removeBuildingFromAllFilter(TEST_BUILDINGS[0])
      );

      expect(endState.buildingAllFilter.length).toBe(0);
    });

    it('should update all filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingAllFilter: [],
        buildingAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(
        startState,
        updateBuildingAllFilter(TEST_BUILDINGS)
      );

      expect(endState.buildingAllFilter.length).toBe(2);
    });

    it('should clear all filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingAllFilter: TEST_BUILDINGS,
        buildingAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(startState, clearAllFilter());

      expect(endState.buildingAllFilter.length).toBe(0);
    });
  });

  describe('building any filter', () => {
    it('should add building to any filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingAllFilter: [],
        buildingAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(
        startState,
        addBuildingToAnyFilter(TEST_BUILDINGS[0])
      );

      expect(endState.buildingAnyFilter.length).toBe(1);
    });

    it('should remove building from any filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingAllFilter: [],
        buildingAnyFilter: [TEST_BUILDINGS[0]],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(
        startState,
        removeBuildingFromAnyFilter(TEST_BUILDINGS[0])
      );

      expect(endState.buildingAnyFilter.length).toBe(0);
    });

    it('should update any filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingAllFilter: [],
        buildingAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(
        startState,
        updateBuildingAnyFilter(TEST_BUILDINGS)
      );

      expect(endState.buildingAnyFilter.length).toBe(2);
    });

    it('should clear any filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingAllFilter: [],
        buildingAnyFilter: TEST_BUILDINGS,
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(startState, clearAnyFilter());

      expect(endState.buildingAnyFilter.length).toBe(0);
    });
  });

  describe('clear filters', () => {
    it('should clear all the filters', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingAllFilter: [TEST_BUILDINGS[0]],
        buildingAnyFilter: [TEST_BUILDINGS[1]],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(startState, clearFilters());

      expect(endState.buildingAllFilter.length).toBe(0);
      expect(endState.buildingAllFilter.length).toBe(0);
    });
  });
});
