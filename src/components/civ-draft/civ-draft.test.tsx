import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import civsReducer, { FetchStatus } from '../../store/civs-slice';
import draftResultReducer from '../../store/draft-result-slice';
import { CivDraft } from '.';

describe('civ draft component', () => {
  test('renders civ draft', () => {
    const store = configureStore({
      reducer: {
        civs: civsReducer,
        draftResult: draftResultReducer,
      },
    });

    const { container: civDraftContainer } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CivDraft />
        </MemoryRouter>
      </Provider>
    );

    const civDraftEl = civDraftContainer.querySelector('.civ-draft');
    expect(civDraftEl).toBeInTheDocument();
  });

  describe('civ draft init', () => {
    test('updates civ pool from query params', () => {
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

      const { container: civDraftContainer } = render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['?civPool=Aztecs,Vikings']}>
            <CivDraft />
          </MemoryRouter>
        </Provider>
      );

      expect(store.getState().civs.civPool.length).toBe(2);
    });
  });

  describe('listens to civ pool changes', () => {
    test('updates query params when civ pool changes', () => {
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

      const { container: civDraftContainer } = render(
        <Provider store={store}>
          <BrowserRouter>
            <CivDraft />
          </BrowserRouter>
        </Provider>
      );

      expect(location.search).not.toContain('civPool=Aztecs');
      fireEvent.click(screen.getByText('Aztecs'));
      expect(location.search).toContain('civPool=Aztecs');
    });
  });
});
