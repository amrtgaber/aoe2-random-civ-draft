import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer, { FetchStatus } from '../../../store/civs-slice';
import draftResultReducer from '../../../store/draft-result-slice';
import { DraftCivButton } from '.';

describe('draft civ button component', () => {
  describe('renders draft civ button', () => {
    test('renders draft civ button', () => {
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
    test('drafts a civ on button click', () => {
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
            civPool: [],
            status: FetchStatus.FULFILLED,
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

    test('does not draft civ before fetch success', () => {
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

    test('only drafts civs from civ pool', () => {
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
