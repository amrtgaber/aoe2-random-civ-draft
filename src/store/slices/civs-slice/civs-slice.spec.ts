import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import { getMockCiv, getMockCivs } from '../../mock-state-service';
import { mockApiCivs } from '../../../api/civs/civs-api.spec';
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
  setCivPool,
} from '.';

fetchMock.enableMocks();

const store = configureStore({
  reducer: civsReducer,
});

describe('civs reducer', () => {
  it('should handle initial load', () => {
    expect(civsReducer(undefined, { type: 'unkown' })).toEqual(
      civsInitialState
    );
  });

  describe('fetch civs', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should fetch all civs', async () => {
      fetchMock.mockResponse(JSON.stringify(mockApiCivs));

      await store.dispatch(fetchCivs());

      expect(store.getState().civsStatus).toBe(FetchStatus.FULFILLED);
      expect(store.getState().allCivs.length).toBe(mockApiCivs.length);
    });

    it('should set civsStatus to failed if request is rejected', async () => {
      fetchMock.mockReject();
      await store.dispatch(fetchCivs());
      expect(store.getState().civsStatus).toBe(FetchStatus.FAILED);
    });
  });

  it('should add all civs to civ pool', () => {
    const mockCivs = getMockCivs();

    const startState = {
      ...civsInitialState,
      allCivs: mockCivs,
    };

    const endState = civsReducer(startState, addAllCivsToPool());
    expect(endState.civPool.length).toBe(mockCivs.length);
  });

  it('should add a civ to civ pool', () => {
    const mockCiv = getMockCiv();

    const endState = civsReducer(civsInitialState, addCivToPool(mockCiv));

    expect(endState.civPool.length).toBe(1);
    expect(endState.civPool[0].id).toBe(mockCiv.id);
  });

  it('should add multiple civs to civ pool', () => {
    const mockCivs = getMockCivs();

    const endState = civsReducer(
      civsInitialState,
      addCivsToPool([mockCivs[0], mockCivs[1]])
    );

    expect(endState.civPool.length).toBe(2);
    expect(endState.civPool[0].id).toBe(mockCivs[0].id);
    expect(endState.civPool[1].id).toBe(mockCivs[1].id);
  });

  it('should remove all civs from civ pool', () => {
    const mockCivs = getMockCivs();

    const startState = {
      ...civsInitialState,
      civPool: mockCivs,
    };

    const endState = civsReducer(startState, removeAllCivsFromPool());
    expect(endState.civPool.length).toBe(0);
  });

  it('should remove a civ from civ pool', () => {
    const mockCivs = getMockCivs();

    const startState = {
      ...civsInitialState,
      civPool: mockCivs,
    };

    const endState = civsReducer(startState, removeCivFromPool(mockCivs[0]));

    expect(endState.civPool.length).toBe(mockCivs.length - 1);
    expect(endState.civPool[0].civName).toBe(mockCivs[1].civName);
  });

  it('should remove multiple civs from civ pool', () => {
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

  it('should set civ pool', () => {
    const mockCivs = getMockCivs();

    const endState = civsReducer(civsInitialState, setCivPool(mockCivs));

    expect(endState.civPool.length).toBe(mockCivs.length);
  });
});
