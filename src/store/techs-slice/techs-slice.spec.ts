import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_TECHS } from '../../test/shared-test-data';
import { FetchStatus } from '../shared-store-utils';
import techsReducer, { fetchTechs, initialState, TechsState } from '.';
import { TechTreeItemType } from '../../api/tech-tree-item-api';

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
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            techName: 'wheelbarrow',
            civs: [],
            buildings: [],
          },
          {
            id: 2,
            techName: 'loom',
            civs: [],
            buildings: [],
          },
        ])
      );

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
