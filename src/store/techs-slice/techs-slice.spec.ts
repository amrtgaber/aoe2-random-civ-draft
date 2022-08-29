import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_CIVS } from '../../shared-test-data';
import { ITechTechTree } from '../../api/techs-api';
import { FetchStatus } from '../shared-store-utils';
import techsReducer, {
  addTechToFilter,
  clearTechsFilter,
  fetchTechs,
  initialState,
  removeTechFromFilter,
  TechsState,
  updateTechsFilter,
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

      expect(store.getState().techsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allTechs.length).toBe(2);
    });

    it('should set techsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchTechs());
      expect(store.getState().techsStatus).toBe(FetchStatus.FAILED);
    });
  });

  describe('tech filter', () => {
    it('should add tech to filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techsFilter: [],
        techsStatus: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(startState, addTechToFilter(TEST_TECHS[0]));

      expect(endState.techsFilter.length).toBe(1);
    });

    it('should remove tech from filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techsFilter: [TEST_TECHS[0]],
        techsStatus: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(
        startState,
        removeTechFromFilter(TEST_TECHS[0])
      );

      expect(endState.techsFilter.length).toBe(0);
    });

    it('should update filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techsFilter: [],
        techsStatus: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(startState, updateTechsFilter(TEST_TECHS));

      expect(endState.techsFilter.length).toBe(2);
    });

    it('should clear tech filter', () => {
      const startState: TechsState = {
        allTechs: TEST_TECHS,
        techsFilter: TEST_TECHS,
        techsStatus: FetchStatus.FULFILLED,
      };

      const endState = techsReducer(startState, clearTechsFilter());

      expect(endState.techsFilter.length).toBe(0);
    });
  });
});
