import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import civsReducer from '../../store/slices/civs-slice';
import draftResultReducer from '../../store/slices/draft-result-slice';
import { FetchStatus } from '../../store/fetch-status-service';
import { TEST_CIVS } from '../../test/shared-test-data';
import { CivDraft } from '.';

describe('civ draft component', () => {
  it('renders civ draft', () => {
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
    it('updates civ pool from query params', () => {
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
    it('updates query params when civ pool changes', () => {
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
