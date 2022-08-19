import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer, { FetchStatus } from '../../store/civs-slice';
import draftResultReducer from '../../store/draft-result-slice';
import { CivDraftResultContainer } from '.';

describe('civ draft result container component', () => {
  describe('renders civ draft result container', () => {
    test('renders civ draft result container', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
      });

      const { container: civDraftResultContainerContainer } = render(
        <Provider store={store}>
          <CivDraftResultContainer />
        </Provider>
      );

      const civDraftResultContainerEl =
        civDraftResultContainerContainer.querySelector(
          '.civ-draft-result-container'
        );

      expect(civDraftResultContainerEl).toBeInTheDocument();
    });
  });
  describe('renders a civ when drafted', () => {
    test('renders civ draft result container', () => {
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

      const { container: civDraftResultContainerContainer } = render(
        <Provider store={store}>
          <CivDraftResultContainer />
        </Provider>
      );

      fireEvent.click(screen.getByText('Draft Civ'));

      expect(screen.getByText('Aztecs')).toBeInTheDocument();
    });
  });
});
