import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer, { FetchStatus } from '../../store/civs-slice';
import draftResultReducer from '../../store/draft-result-slice';
import { CivDraftResultContainer } from '.';
import { TEST_CIVS } from '../../shared-test-data';

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
            allCivs: TEST_CIVS,
            civPool: [TEST_CIVS[0]],
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
