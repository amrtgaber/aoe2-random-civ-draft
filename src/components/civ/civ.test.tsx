import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer from '../../store/civs-slice';
import draftResultReducer from '../../store/draft-result-slice';
import { FetchStatus } from '../../store/shared-store-utils';
import { TEST_CIVS } from '../../shared-test-data';
import { Civ } from '.';

describe('civ component', () => {
  describe('renders civ component', () => {
    test('renders civ component', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
      });

      const { container: civContainer } = render(
        <Provider store={store}>
          <Civ
            civ={TEST_CIVS[0]}
            isDrafted={false}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      const civEl = civContainer.querySelector('.civ-container');
      expect(civEl).toBeInTheDocument();
    });
  });

  describe('civ in civ draft component', () => {
    test('adds civ to civ pool when clicked', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
      });

      const { container: civContainer } = render(
        <Provider store={store}>
          <Civ
            civ={TEST_CIVS[0]}
            isDrafted={false}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      fireEvent.click(screen.getByText('Aztecs'));
      expect(store.getState().civs.civPool[0].civName).toBe('Aztecs');
    });

    test('removes civ from civ pool when clicked', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
        preloadedState: {
          civs: {
            allCivs: TEST_CIVS,
            civPool: [TEST_CIVS[0]],
            civsStatus: FetchStatus.FULFILLED,
          },
        },
      });

      const { container: civContainer } = render(
        <Provider store={store}>
          <Civ
            civ={TEST_CIVS[0]}
            isDrafted={false}
            isDraftable={true}
            isInPool={true}
          />
        </Provider>
      );

      fireEvent.click(screen.getByText('Aztecs'));
      expect(store.getState().civs.civPool.length).toBe(0);
    });

    test('clicking tech tree does not affect pool state', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
        preloadedState: {
          civs: {
            allCivs: TEST_CIVS,
            civPool: [TEST_CIVS[0]],
            civsStatus: FetchStatus.FULFILLED,
          },
        },
      });

      const { container: civContainer } = render(
        <Provider store={store}>
          <Civ
            civ={TEST_CIVS[0]}
            isDrafted={false}
            isDraftable={true}
            isInPool={true}
          />
          <Civ
            civ={TEST_CIVS[1]}
            isDrafted={false}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      fireEvent.click(screen.getByAltText('Aztecs emblem'));
      expect(store.getState().civs.civPool[0].civName).toBe('Aztecs');

      fireEvent.click(screen.getByAltText('Vikings emblem'));
      expect(store.getState().civs.civPool[0].civName).toBe('Aztecs');
    });
  });

  describe('civ in draft result component', () => {
    test('renders civ in draft result component', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
      });

      const { container: civContainer } = render(
        <Provider store={store}>
          <Civ
            civ={TEST_CIVS[0]}
            isDrafted={true}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      const civEl = civContainer.querySelector('.civ-container');
      expect(civEl).toBeInTheDocument();
    });

    test('removes animation class when animation ends', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
      });

      const { container: civContainer } = render(
        <Provider store={store}>
          <Civ
            civ={TEST_CIVS[0]}
            isDrafted={true}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      const mainContentEl = civContainer.querySelector('.civ-main-content');
      fireEvent.animationEnd(mainContentEl!);
      expect(mainContentEl!.classList).not.toContain('highlight-drafted');
    });
  });
});
