import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_CIVS } from '../../shared-test-data';
import { ITechTechTree } from '../../api/techs-api';
import techsReducer, {
  addTechToAllFilter,
  addTechToAnyFilter,
  clearAllFilter,
  clearAnyFilter,
  clearFilters,
  FetchStatus,
  fetchTechs,
  initialState,
  removeTechFromAllFilter,
  removeTechFromAnyFilter,
  TechsState,
  updateTechAllFilter,
  updateTechAnyFilter,
} from '.';

const TEST_TECHS: ITechTechTree[] = [
  {
    id: 1,
    techName: 'loom',
    civs: TEST_CIVS,
  },
  {
    id: 2,
    techName: 'wheelbarrow',
    civs: TEST_CIVS,
  },
];

fetchMock.enableMocks();

const store = configureStore({
  reducer: techsReducer,
});

describe('techs reducer', () => {
  it('should handle initial load', () => {
    expect(techsReducer(undefined, { type: 'unkown' })).toEqual<TechsState>(
      initialState
    );
  });

  describe('fetch techs', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch all techs', async () => {
      fetchMock.mockResponse(JSON.stringify(TEST_TECHS));

      await store.dispatch(fetchTechs());

      expect(store.getState().status).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allTechs.length).toBe(2);
    });

    it('should set status to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchTechs());
      expect(store.getState().status).toBe(FetchStatus.FAILED);
    });
  });

  describe('tech all filter', () => {
    it('should add tech to all filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techAllFilter: [],
        techAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(
        startState,
        addTechToAllFilter(TEST_TECHS[0])
      );

      expect(endState.techAllFilter.length).toBe(1);
    });

    it('should remove tech from all filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techAllFilter: [TEST_TECHS[0]],
        techAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(
        startState,
        removeTechFromAllFilter(TEST_TECHS[0])
      );

      expect(endState.techAllFilter.length).toBe(0);
    });

    it('should update all filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techAllFilter: [],
        techAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(
        startState,
        updateTechAllFilter(TEST_TECHS)
      );

      expect(endState.techAllFilter.length).toBe(2);
    });

    it('should clear all filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techAllFilter: TEST_TECHS,
        techAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(startState, clearAllFilter());

      expect(endState.techAllFilter.length).toBe(0);
    });
  });

  describe('tech any filter', () => {
    it('should add tech to any filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techAllFilter: [],
        techAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(
        startState,
        addTechToAnyFilter(TEST_TECHS[0])
      );

      expect(endState.techAnyFilter.length).toBe(1);
    });

    it('should remove tech from any filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techAllFilter: [],
        techAnyFilter: [TEST_TECHS[0]],
        status: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(
        startState,
        removeTechFromAnyFilter(TEST_TECHS[0])
      );

      expect(endState.techAnyFilter.length).toBe(0);
    });

    it('should update any filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techAllFilter: [],
        techAnyFilter: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(
        startState,
        updateTechAnyFilter(TEST_TECHS)
      );

      expect(endState.techAnyFilter.length).toBe(2);
    });

    it('should clear any filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techAllFilter: [],
        techAnyFilter: TEST_TECHS,
        status: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(startState, clearAnyFilter());

      expect(endState.techAnyFilter.length).toBe(0);
    });
  });

  describe('clear filters', () => {
    it('should clear all the filters', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techAllFilter: [TEST_TECHS[0]],
        techAnyFilter: [TEST_TECHS[1]],
        status: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(startState, clearFilters());

      expect(endState.techAllFilter.length).toBe(0);
      expect(endState.techAnyFilter.length).toBe(0);
    });
  });
});
