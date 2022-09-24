import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer from '../../../store/slices/civs-slice';
import draftResultReducer from '../../../store/slices/draft-result-slice';
import { FetchStatus } from '../../../store/fetch-status-service';
import { TEST_CIVS } from '../../../test/shared-test-data';
import { DraftCivButton } from '.';

describe('draft civ button component', () => {
  describe('renders draft civ button', () => {
    it('renders draft civ button', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
      });

      const { container: draftCivButtonContainer } = render(
        <Provider store={store}>
          <DraftCivButton />
        </Provider>
      );

      expect(screen.getByText('Draft Civ')).toBeInTheDocument();
    });
  });

  describe('drafts a civ', () => {
    it('drafts a civ on button click', () => {
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

      const { container: draftCivButtonContainer } = render(
        <Provider store={store}>
          <DraftCivButton />
        </Provider>
      );

      expect(store.getState().draftResult.draftCount).toBe(0);
      fireEvent.click(screen.getByText('Draft Civ'));
      expect(store.getState().draftResult.draftCount).toBe(1);
    });

    it('does not draft civ before fetch success', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
      });

      const { container: draftCivButtonContainer } = render(
        <Provider store={store}>
          <DraftCivButton />
        </Provider>
      );

      expect(store.getState().draftResult.draftCount).toBe(0);
      fireEvent.click(screen.getByText('Draft Civ'));
      expect(store.getState().draftResult.draftCount).toBe(0);
    });

    it('only drafts civs from civ pool', () => {
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

      const { container: draftCivButtonContainer } = render(
        <Provider store={store}>
          <DraftCivButton />
        </Provider>
      );

      expect(store.getState().draftResult.draftCount).toBe(0);
      fireEvent.click(screen.getByText('Draft Civ'));
      expect(store.getState().draftResult.civ?.civName).toBe('Aztecs');
      fireEvent.click(screen.getByText('Draft Civ'));
      expect(store.getState().draftResult.civ?.civName).toBe('Aztecs');
      fireEvent.click(screen.getByText('Draft Civ'));
      expect(store.getState().draftResult.civ?.civName).toBe('Aztecs');
      fireEvent.click(screen.getByText('Draft Civ'));
      expect(store.getState().draftResult.civ?.civName).toBe('Aztecs');
      expect(store.getState().draftResult.draftCount).toBe(4);
    });
  });
});
