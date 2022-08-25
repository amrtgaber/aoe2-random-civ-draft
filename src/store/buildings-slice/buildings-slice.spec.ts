import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_CIVS } from '../../shared-test-data';
import { IBuildingTechTree } from '../../api/buildings-api';
import buildingsReducer, {
  addBuildingToFilter,
  BuildingsState,
  clearBuildingsFilter,
  fetchBuildings,
  FetchStatus,
  initialState,
  removeBuildingFromFilter,
  updateBuildingsFilter,
} from '.';

const TEST_BUILDINGS: IBuildingTechTree[] = [
  {
    id: 1,
    buildingName: 'castle',
    civs: TEST_CIVS,
  },
  {
    id: 2,
    buildingName: 'house',
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

  describe('building filter', () => {
    it('should add building to filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingsFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(
        startState,
        addBuildingToFilter(TEST_BUILDINGS[0])
      );

      expect(endState.buildingsFilter.length).toBe(1);
    });

    it('should remove building from filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingsFilter: [TEST_BUILDINGS[0]],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(
        startState,
        removeBuildingFromFilter(TEST_BUILDINGS[0])
      );

      expect(endState.buildingsFilter.length).toBe(0);
    });

    it('should update filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingsFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(
        startState,
        updateBuildingsFilter(TEST_BUILDINGS)
      );

      expect(endState.buildingsFilter.length).toBe(2);
    });

    it('should clear building filter', () => {
      const startState: BuildingsState = {
        allBuildings: TEST_BUILDINGS,
        buildingsFilter: TEST_BUILDINGS,
        status: FetchStatus.FULFILLED,
      };

      const endState = buildingsReducer(startState, clearBuildingsFilter());

      expect(endState.buildingsFilter.length).toBe(0);
    });
  });
});
