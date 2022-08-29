import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer from '../../store/civs-slice';
import draftResultReducer from '../../store/draft-result-slice';
import { FetchStatus } from '../../store/shared-store-utils';
import { TEST_CIVS } from '../../shared-test-data';
import { CivDraftParameters } from '.';

describe('civ draft parameters component', () => {
  describe('renders civ draft parameters', () => {
    test('renders civ draft parameters', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
      });

      const { container: civDraftParameters } = render(
        <Provider store={store}>
          <CivDraftParameters />
        </Provider>
      );

      const civDraftParametersEl = civDraftParameters.querySelector(
        '.civ-draft-parameters'
      );

      expect(civDraftParametersEl).toBeInTheDocument();
    });
  });

  describe('add all, remove, and invert selection', () => {
    test('adds all civs to pool', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
        preloadedState: {
          civs: {
            allCivs: TEST_CIVS,
            civPool: [],
            civsStatus: FetchStatus.FULFILLED,
          },
        },
      });

      const { container: civDraftParameters } = render(
        <Provider store={store}>
          <CivDraftParameters />
        </Provider>
      );

      expect(store.getState().civs.civPool.length).toBe(0);
      fireEvent.click(screen.getByText('Add all civs'));
      expect(store.getState().civs.civPool.length).toBe(2);
    });

    test('removes all civs from pool', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
        preloadedState: {
          civs: {
            allCivs: TEST_CIVS,
            civPool: TEST_CIVS,
            civsStatus: FetchStatus.FULFILLED,
          },
        },
      });

      const { container: civDraftParameters } = render(
        <Provider store={store}>
          <CivDraftParameters />
        </Provider>
      );

      expect(store.getState().civs.civPool.length).toBe(2);
      fireEvent.click(screen.getByText('Reset'));
      expect(store.getState().civs.civPool.length).toBe(0);
    });

    test('inverts civ pool selection', () => {
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

      const { container: civDraftParameters } = render(
        <Provider store={store}>
          <CivDraftParameters />
        </Provider>
      );

      expect(store.getState().civs.civPool[0].civName).toBe('Aztecs');
      fireEvent.click(screen.getByText('Invert selection'));
      expect(store.getState().civs.civPool[0].civName).toBe('Vikings');
    });
  });
});
