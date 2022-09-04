import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_CIVS } from '../../shared-test-data';
import { IBuilding } from '../../api/buildings-api';
import { FetchStatus } from '../shared-store-utils';
import buildingsReducer, {
  BuildingsState,
  fetchBuildings,
  initialState,
} from '.';
import { TechTreeItemType } from '../../api/tech-tree-item-api';

const TEST_BUILDINGS: IBuilding[] = [
  {
    id: 1,
    itemName: 'castle',
    civs: TEST_CIVS,
    kind: TechTreeItemType.BUILDING,
  },
  {
    id: 2,
    itemName: 'house',
    civs: TEST_CIVS,
    kind: TechTreeItemType.BUILDING,
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
