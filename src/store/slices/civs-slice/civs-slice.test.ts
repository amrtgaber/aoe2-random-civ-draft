import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { getMockCiv, getMockCivs } from '../../mock-state-service';
import { mockApiCivs } from '../../../api/civs/civs-api.test';
import { FetchStatus } from '../../fetch-status-service';

import civsReducer, {
  addAllCivsToPool,
  addCivsToPool,
  addCivToPool,
  civsInitialState,
  fetchCivs,
  removeAllCivsFromPool,
  removeCivFromPool,
  removeCivsFromPool,
  removeDuplicateCivs,
  setCivPool,
} from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: civsReducer,
});

describe('civs reducer', () => {
  test('should handle initial load', () => {
    expect(civsReducer(undefined, { type: 'unkown' })).toEqual(
      civsInitialState
    );
  });

  describe('fetch civs', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    test('should fetch all civs', async () => {
      fetchMock.mockResponse(JSON.stringify(mockApiCivs));

      await store.dispatch(fetchCivs());

      expect(store.getState().civsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allCivs.length).toBe(mockApiCivs.length);
    });

    test('should set civsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchCivs());
      expect(store.getState().civsStatus).toBe(FetchStatus.FAILED);
    });
  });

  test('should add all civs to civ pool', () => {
    const mockCivs = getMockCivs();

    const startState = {
      ...civsInitialState,
      allCivs: mockCivs,
    };

    const endState = civsReducer(startState, addAllCivsToPool());
    expect(endState.civPool.length).toBe(mockCivs.length);
  });

  test('should add a civ to civ pool', () => {
    const mockCiv = getMockCiv();

    const endState = civsReducer(civsInitialState, addCivToPool(mockCiv));

    expect(endState.civPool.length).toBe(1);
    expect(endState.civPool[0].id).toBe(mockCiv.id);
  });

  test('should not add a duplicate civ to civ pool', () => {
    const mockCiv = getMockCiv();

    civsReducer(civsInitialState, addCivToPool(mockCiv));
    const endState = civsReducer(civsInitialState, addCivToPool(mockCiv));

    expect(endState.civPool.length).toBe(1);
    expect(endState.civPool[0].id).toBe(mockCiv.id);
  });

  test('should add multiple civs to civ pool', () => {
    const mockCivs = getMockCivs();

    const endState = civsReducer(
      civsInitialState,
      addCivsToPool([mockCivs[0], mockCivs[1]])
    );

    expect(endState.civPool.length).toBe(2);
    expect(endState.civPool[0].id).toBe(mockCivs[0].id);
    expect(endState.civPool[1].id).toBe(mockCivs[1].id);
  });

  test('should not add duplicate multiple civs to civ pool', () => {
    const mockCivs = getMockCivs();

    civsReducer(civsInitialState, addCivsToPool([mockCivs[0], mockCivs[1]]));

    const endState = civsReducer(
      civsInitialState,
      addCivsToPool([mockCivs[0], mockCivs[1]])
    );

    expect(endState.civPool.length).toBe(2);
    expect(endState.civPool[0].id).toBe(mockCivs[0].id);
    expect(endState.civPool[1].id).toBe(mockCivs[1].id);
  });

  test('should remove all civs from civ pool', () => {
    const mockCivs = getMockCivs();

    const startState = {
      ...civsInitialState,
      civPool: mockCivs,
    };

    const endState = civsReducer(startState, removeAllCivsFromPool());
    expect(endState.civPool.length).toBe(0);
  });

  test('should remove a civ from civ pool', () => {
    const mockCivs = getMockCivs();

    const startState = {
      ...civsInitialState,
      civPool: mockCivs,
    };

    const endState = civsReducer(startState, removeCivFromPool(mockCivs[0]));

    expect(endState.civPool.length).toBe(mockCivs.length - 1);
    expect(endState.civPool[0].civName).toBe(mockCivs[1].civName);
  });

  test('should remove multiple civs from civ pool', () => {
    const mockCivs = getMockCivs();

    const startState = {
      ...civsInitialState,
      civPool: mockCivs,
    };

    const endState = civsReducer(
      startState,
      removeCivsFromPool([mockCivs[0], mockCivs[1]])
    );

    expect(endState.civPool.length).toBe(mockCivs.length - 2);
    expect(endState.civPool[0].civName).toBe(mockCivs[2].civName);
  });

  test('should set civ pool', () => {
    const mockCivs = getMockCivs();

    const endState = civsReducer(civsInitialState, setCivPool(mockCivs));

    expect(endState.civPool.length).toBe(mockCivs.length);
  });
});
