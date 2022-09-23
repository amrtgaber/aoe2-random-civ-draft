import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer from '../../store/slices/civs-slice';
import draftResultReducer from '../../store/slices/draft-result-slice';
import { FetchStatus } from '../../store/fetch-status-service';
import { TEST_CIVS } from '../../test/shared-test-data';
import { SaveCivPool } from '.';

describe('save civ pool component', () => {
  describe('renders save civ pool', () => {
    test('renders save civ pool', () => {
      const store = configureStore({
        reducer: {
          civs: civsReducer,
          draftResult: draftResultReducer,
        },
      });

      const { container: saveCivPool } = render(
        <Provider store={store}>
          <SaveCivPool />
        </Provider>
      );

      expect(screen.getByText('Save current civ pool')).toBeInTheDocument();
    });
  });

  describe('save button', () => {
    test('saves civ pool', () => {
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

      const { container: saveCivPool } = render(
        <Provider store={store}>
          <SaveCivPool />
        </Provider>
      );

      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });

      const clipboardSpy = jest.spyOn(navigator.clipboard, 'writeText');
      expect(clipboardSpy).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText('Save current civ pool'));
      expect(clipboardSpy).toHaveBeenCalled();
    });
  });
});
