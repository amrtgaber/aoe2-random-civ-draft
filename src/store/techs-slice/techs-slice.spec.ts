import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_CIVS } from '../../shared-test-data';
import { ITechTechTree } from '../../api/techs-api';
import { FetchStatus } from '../shared-store-utils';
import techsReducer, { fetchTechs, initialState, TechsState } from '.';

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
});
