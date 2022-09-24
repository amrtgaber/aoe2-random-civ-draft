import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { mockApiTechs } from '../../../api/techs/techs-api.spec';
import { FetchStatus } from '../../fetch-status-service';

import techsReducer, { fetchTechs, techsInitialState } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: techsReducer,
});

describe('techs reducer', () => {
  it('should handle initial load', () => {
    expect(techsReducer(undefined, { type: 'unkown' })).toEqual(
      techsInitialState
    );
  });

  describe('fetch techs', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch all techs', async () => {
      fetchMock.mockResponse(JSON.stringify(mockApiTechs));

      await store.dispatch(fetchTechs());

      expect(store.getState().techsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allTechs.length).toBe(mockApiTechs.length);
    });

    it('should set techsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchTechs());
      expect(store.getState().techsStatus).toBe(FetchStatus.FAILED);
    });
  });
});
