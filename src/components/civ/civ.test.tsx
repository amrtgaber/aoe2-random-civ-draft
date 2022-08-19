import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer, { FetchStatus } from '../../store/civs-slice';
import draftResultReducer from '../../store/draft-result-slice';
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
            civ={{ civName: 'Aztecs', id: 1 }}
            isDrafted={false}
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
            civ={{ civName: 'Aztecs', id: 1 }}
            isDrafted={false}
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
            allCivs: [
              { civName: 'Aztecs', id: 1 },
              { civName: 'Vikings', id: 2 },
            ],
            civPool: [{ civName: 'Aztecs', id: 1 }],
            status: FetchStatus.FULFILLED,
          },
        },
      });

      const { container: civContainer } = render(
        <Provider store={store}>
          <Civ
            civ={{ civName: 'Aztecs', id: 1 }}
            isDrafted={false}
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
            allCivs: [
              { civName: 'Aztecs', id: 1 },
              { civName: 'Vikings', id: 2 },
            ],
            civPool: [{ civName: 'Aztecs', id: 1 }],
            status: FetchStatus.FULFILLED,
          },
        },
      });

      const { container: civContainer } = render(
        <Provider store={store}>
          <Civ
            civ={{ civName: 'Aztecs', id: 1 }}
            isDrafted={false}
            isInPool={true}
          />
          <Civ
            civ={{ civName: 'Vikings', id: 1 }}
            isDrafted={false}
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
            civ={{ civName: 'Aztecs', id: 1 }}
            isDrafted={true}
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
            civ={{ civName: 'Aztecs', id: 1 }}
            isDrafted={true}
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
