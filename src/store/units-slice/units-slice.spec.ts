import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { TEST_CIVS } from '../../shared-test-data';
import { IUnit } from '../../api/units-api';
import { FetchStatus } from '../shared-store-utils';
import unitsReducer, { fetchUnits, initialState, UnitsState } from '.';
import { TechTreeItemType } from '../../api/tech-tree-item-api';

const TEST_UNITS: IUnit[] = [
  {
    id: 1,
    itemName: 'archer',
    civs: TEST_CIVS,
    kind: TechTreeItemType.UNIT,
  },
  {
    id: 2,
    itemName: 'skirmisher',
    civs: TEST_CIVS,
    kind: TechTreeItemType.UNIT,
  },
];

fetchMock.enableMocks();

const store = configureStore({
  reducer: unitsReducer,
});

describe('units reducer', () => {
  it('should handle initial load', () => {
    expect(unitsReducer(undefined, { type: 'unkown' })).toEqual<UnitsState>(
      initialState
    );
  });

  describe('fetch units', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch all units', async () => {
      fetchMock.mockResponse(JSON.stringify(TEST_UNITS));

      await store.dispatch(fetchUnits());

      expect(store.getState().unitsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allUnits.length).toBe(2);
    });

    it('should set unitsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchUnits());
      expect(store.getState().unitsStatus).toBe(FetchStatus.FAILED);
    });
  });
});
