import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { FetchStatus } from '../../fetch-status-service';
import agesReducer, { AgesState, fetchAges, initialState } from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: agesReducer,
});

describe('ages reducer', () => {
  it('should handle initial load', () => {
    expect(agesReducer(undefined, { type: 'unkown' })).toEqual<AgesState>(
      initialState
    );
  });

  describe('fetch ages', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch game ages', async () => {
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            ageName: 'dark age',
            units: [
              { id: 1000, itemName: 'villager' },
              { id: 1001, itemName: 'militia' },
            ],
            techs: [
              { id: 1002, itemName: 'loom' },
              { id: 1003, itemName: 'feudal age' },
            ],
            buildings: [
              { id: 1004, itemName: 'lumber camp' },
              { id: 1005, itemName: 'house' },
            ],
          },
        ])
      );

      await store.dispatch(fetchAges());

      expect(store.getState().agesStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allAges.length).toBe(1);
    });

    it('should set agesStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchAges());
      expect(store.getState().agesStatus).toBe(FetchStatus.FAILED);
    });
  });
});
