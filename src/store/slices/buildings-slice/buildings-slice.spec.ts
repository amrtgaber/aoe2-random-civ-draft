import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_BUILDINGS } from '../../../test/shared-test-data';
import { FetchStatus } from '../../fetch-status-service';
import buildingsReducer, {
  BuildingsState,
  fetchBuildings,
  initialState,
} from '.';

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
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            buildingName: 'house',
            civs: [],
            units: [],
            techs: [],
          },
          {
            id: 2,
            buildingName: 'castle',
            civs: [],
            units: [],
            techs: [],
          },
        ])
      );

      await store.dispatch(fetchBuildings());

      expect(store.getState().buildingsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allBuildings.length).toBe(2);
    });

    it('should set buildingsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchBuildings());
      expect(store.getState().buildingsStatus).toBe(FetchStatus.FAILED);
    });
  });
});
