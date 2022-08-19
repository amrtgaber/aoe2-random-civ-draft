import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import civsReducer, {
  addAllCivsToPool,
  addCivToPool,
  CivsState,
  fetchCivs,
  FetchStatus,
  initialState,
  removeAllCivsFromPool,
  removeCivFromPool,
  updateCivPool,
} from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: civsReducer,
});

describe('civs reducer', () => {
  it('should handle initial load', () => {
    expect(civsReducer(undefined, { type: 'unkown' })).toEqual<CivsState>(
      initialState
    );
  });

  describe('fetch civs', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch all civs', async () => {
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 1,
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            civName: 'Aztecs',
          },
          {
            id: 2,
            createdAt: '2022-08-18T20:26:39.368Z',
            updatedAt: '2022-08-18T20:26:39.372Z',
            civName: 'Vikings',
          },
        ])
      );

      await store.dispatch(fetchCivs());

      expect(store.getState().status).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allCivs.length).toBe(2);
    });

    it('should set status to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchCivs());
      expect(store.getState().status).toBe(FetchStatus.FAILED);
    });
  });

  describe('add all civs to civ pool', () => {
    it('should add all civs to civ pool', () => {
      const startState: CivsState = {
        allCivs: [
          { civName: 'Aztecs', id: 1 },
          { civName: 'Vikings', id: 2 },
        ],
        civPool: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(startState, addAllCivsToPool());
      expect(endState.civPool.length).toBe(2);
    });
  });

  describe('add a civ to civ pool', () => {
    it('should add a civ to civ pool', () => {
      const startState: CivsState = {
        allCivs: [
          { civName: 'Aztecs', id: 1 },
          { civName: 'Vikings', id: 2 },
        ],
        civPool: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(
        startState,
        addCivToPool({ civName: 'Aztecs', id: 1 })
      );

      expect(endState.civPool.length).toBe(1);
      expect(endState.civPool[0].civName).toBe('Aztecs');
    });
  });

  describe('remove all civs from civ pool', () => {
    it('should remove all civs from civ pool', () => {
      const startState: CivsState = {
        allCivs: [],
        civPool: [
          { civName: 'Aztecs', id: 1 },
          { civName: 'Vikings', id: 2 },
        ],
        status: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(startState, removeAllCivsFromPool());
      expect(endState.civPool.length).toBe(0);
    });
  });

  describe('remove a civ from civ pool', () => {
    it('should remove a civ from civ pool', () => {
      const startState: CivsState = {
        allCivs: [],
        civPool: [
          { civName: 'Aztecs', id: 1 },
          { civName: 'Vikings', id: 2 },
        ],
        status: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(
        startState,
        removeCivFromPool({ civName: 'Aztecs', id: 1 })
      );

      expect(endState.civPool.length).toBe(1);
      expect(endState.civPool[0].civName).toBe('Vikings');
    });
  });

  describe('update civ pool', () => {
    it('should update civ pool', () => {
      const startState: CivsState = {
        allCivs: [],
        civPool: [],
        status: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(
        startState,
        updateCivPool([
          { civName: 'Aztecs', id: 1 },
          { civName: 'Vikings', id: 2 },
        ])
      );

      expect(endState.civPool.length).toBe(2);
    });
  });
});
