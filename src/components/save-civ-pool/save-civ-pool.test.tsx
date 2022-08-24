import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import civsReducer, { FetchStatus } from '../../store/civs-slice';
import draftResultReducer from '../../store/draft-result-slice';
import { SaveCivPool } from '.';
import { TEST_CIVS } from '../../shared-test-data';

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
            status: FetchStatus.FULFILLED,
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
