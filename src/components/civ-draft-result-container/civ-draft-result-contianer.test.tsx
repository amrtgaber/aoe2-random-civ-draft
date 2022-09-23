import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer from '../../store/slices/civs-slice';
import draftResultReducer from '../../store/slices/draft-result-slice';
import { FetchStatus } from '../../store/fetch-status-service';
import { TEST_CIVS } from '../../test/shared-test-data';
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
            allCivs: TEST_CIVS,
            civPool: [TEST_CIVS[0]],
            civsStatus: FetchStatus.FULFILLED,
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
