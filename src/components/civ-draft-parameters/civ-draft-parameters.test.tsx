import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { FetchStatus } from '../../store/fetch-status-service';
import { configureTestStore, TEST_CIVS } from '../../test/shared-test-data';
import { CivDraftParameters } from '.';

describe('civ draft parameters component', () => {
  describe('renders civ draft parameters', () => {
    test('renders civ draft parameters', () => {
      const store = configureTestStore();

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
      const store = configureTestStore({
        civs: {
          allCivs: TEST_CIVS,
          civPool: [],
          civsStatus: FetchStatus.FULFILLED,
        },
      });

      const { container: civDraftParameters } = render(
        <Provider store={store}>
          <CivDraftParameters />
        </Provider>
      );

      expect(store.getState().civs.civPool.length).toBe(0);
      fireEvent.click(screen.getByText('Add all civs'));
      expect(store.getState().civs.civPool.length).toBe(TEST_CIVS.length);
    });

    test('removes all civs from pool', () => {
      const store = configureTestStore({
        civs: {
          allCivs: TEST_CIVS,
          civPool: TEST_CIVS,
          civsStatus: FetchStatus.FULFILLED,
        },
      });

      const { container: civDraftParameters } = render(
        <Provider store={store}>
          <CivDraftParameters />
        </Provider>
      );

      expect(store.getState().civs.civPool.length).toBe(TEST_CIVS.length);
      fireEvent.click(screen.getByText('Reset'));
      expect(store.getState().civs.civPool.length).toBe(0);
    });

    test('inverts civ pool selection', () => {
      const store = configureTestStore({
        civs: {
          allCivs: TEST_CIVS,
          civPool: [TEST_CIVS[0]],
          civsStatus: FetchStatus.FULFILLED,
        },
      });

      const { container: civDraftParameters } = render(
        <Provider store={store}>
          <CivDraftParameters />
        </Provider>
      );

      expect(store.getState().civs.civPool.length).toBe(1);
      fireEvent.click(screen.getByText('Invert selection'));
      expect(store.getState().civs.civPool.length).toBe(TEST_CIVS.length - 1);
    });
  });
});
