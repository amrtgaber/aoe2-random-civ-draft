import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { getMockCivs } from '../../mock-state-service';
import { FetchStatus } from '../../fetch-status-service';

import civsReducer, {
  addAllCivsToPool,
  addCivsToPool,
  addCivToPool,
  CivsState,
  fetchCivs,
  initialState,
  removeAllCivsFromPool,
  removeCivFromPool,
  removeCivsFromPool,
  setCivPool,
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
            civName: 'Vikings',
            units: [
              { id: 1, itemName: 'archer' },
              { id: 2, itemName: 'skirmisher' },
            ],
            techs: [
              { id: 1, itemName: 'loom' },
              { id: 2, itemName: 'wheelbarrow' },
            ],
            buildings: [
              { id: 1, itemName: 'castle' },
              { id: 2, itemName: 'house' },
            ],
          },
          {
            id: 2,
            civName: 'Aztecs',
            units: [
              { id: 1, itemName: 'archer' },
              { id: 2, itemName: 'skirmisher' },
            ],
            techs: [
              { id: 1, itemName: 'loom' },
              { id: 2, itemName: 'wheelbarrow' },
            ],
            buildings: [
              { id: 1, itemName: 'castle' },
              { id: 2, itemName: 'house' },
            ],
          },
        ])
      );

      await store.dispatch(fetchCivs());

      expect(store.getState().civsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allCivs.length).toBe(2);
    });

    it('should set civsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchCivs());
      expect(store.getState().civsStatus).toBe(FetchStatus.FAILED);
    });
  });

  describe('add all civs to civ pool', () => {
    it('should add all civs to civ pool', () => {
      const startState: CivsState = {
        allCivs: getMockCivs(),
        civPool: [],
        civsStatus: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(startState, addAllCivsToPool());
      expect(endState.civPool.length).toBe(getMockCivs().length);
    });
  });

  describe('add a civ to civ pool', () => {
    it('should add a civ to civ pool', () => {
      const startState: CivsState = {
        allCivs: getMockCivs(),
        civPool: [],
        civsStatus: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(startState, addCivToPool(getMockCivs()[0]));

      expect(endState.civPool.length).toBe(1);
      expect(endState.civPool[0].civName).toBe('Aztecs');
    });
  });

  describe('add multiple civs to civ pool', () => {
    it('should add multiple civs to civ pool', () => {
      const startState: CivsState = {
        allCivs: getMockCivs(),
        civPool: [],
        civsStatus: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(
        startState,
        addCivsToPool([getMockCivs()[0], getMockCivs()[1]])
      );

      expect(endState.civPool.length).toBe(2);
      expect(endState.civPool[0].civName).toBe('Aztecs');
      expect(endState.civPool[1].civName).toBe('Franks');
    });
  });

  describe('remove all civs from civ pool', () => {
    it('should remove all civs from civ pool', () => {
      const startState: CivsState = {
        allCivs: [],
        civPool: getMockCivs(),
        civsStatus: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(startState, removeAllCivsFromPool());
      expect(endState.civPool.length).toBe(0);
    });
  });

  describe('remove a civ from civ pool', () => {
    it('should remove a civ from civ pool', () => {
      const mockCivs = getMockCivs();

      const startState: CivsState = {
        allCivs: [],
        civPool: mockCivs,
        civsStatus: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(startState, removeCivFromPool(mockCivs[0]));

      expect(endState.civPool.length).toBe(mockCivs.length - 1);
      expect(endState.civPool[0].civName).toBe(mockCivs[1].civName);
    });
  });

  describe('removes multiple civs from civ pool', () => {
    it('should remove multiple civs from civ pool', () => {
      const mockCivs = getMockCivs();

      const startState: CivsState = {
        allCivs: [],
        civPool: mockCivs,
        civsStatus: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(
        startState,
        removeCivsFromPool([mockCivs[0], mockCivs[1]])
      );

      expect(endState.civPool.length).toBe(mockCivs.length - 2);
      expect(endState.civPool[0].civName).toBe(mockCivs[2].civName);
    });
  });

  describe('update civ pool', () => {
    it('should update civ pool', () => {
      const startState: CivsState = {
        allCivs: [],
        civPool: [],
        civsStatus: FetchStatus.FULFILLED,
      };

      const endState = civsReducer(startState, setCivPool(getMockCivs()));

      expect(endState.civPool.length).toBe(getMockCivs().length);
    });
  });
});
