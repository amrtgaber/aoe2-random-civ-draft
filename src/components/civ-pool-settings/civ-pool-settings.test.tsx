import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import {
  configureMockStore,
  getMockCivs,
} from '../../store/mock-state-service';

import { CivPoolSettings } from '.';

describe('civ pool settings component', () => {
  describe('renders civ pool settings', () => {
    test('renders civ pool settings', () => {
      const mockStore = configureMockStore();

      const { container: civPoolSettings } = render(
        <Provider store={mockStore}>
          <CivPoolSettings />
        </Provider>
      );

      const civPoolSettingsEl =
        civPoolSettings.querySelector('.civ-pool-settings');

      expect(civPoolSettingsEl).toBeInTheDocument();
    });
  });

  describe('add all, remove, and invert selection', () => {
    test('adds all civs to pool', () => {
      const mockCivs = getMockCivs();

      const mockStore = configureMockStore({
        civs: MOCK_STATE.civs,
      });

      const { container: civPoolSettings } = render(
        <Provider store={mockStore}>
          <CivPoolSettings />
        </Provider>
      );

      expect(mockStore.getState().civs.civPool.length).toBe(0);
      fireEvent.click(screen.getByText('Add all civs'));
      expect(mockStore.getState().civs.civPool.length).toBe(mockCivs.length);
    });

    test('removes all civs from pool', () => {
      const mockCivs = getMockCivs();

      const mockStore = configureMockStore({
        civs: {
          ...MOCK_STATE.civs,
          civPool: mockCivs,
        },
      });

      const { container: civPoolSettings } = render(
        <Provider store={mockStore}>
          <CivPoolSettings />
        </Provider>
      );

      expect(mockStore.getState().civs.civPool.length).toBe(mockCivs.length);
      fireEvent.click(screen.getByText('Reset'));
      expect(mockStore.getState().civs.civPool.length).toBe(0);
    });

    test('inverts civ pool selection', () => {
      const mockCivs = getMockCivs();

      const mockStore = configureMockStore({
        civs: {
          ...MOCK_STATE.civs,
          civPool: [mockCivs[0]],
        },
      });

      const { container: civPoolSettings } = render(
        <Provider store={mockStore}>
          <CivPoolSettings />
        </Provider>
      );

      expect(mockStore.getState().civs.civPool.length).toBe(1);
      fireEvent.click(screen.getByText('Invert selection'));
      expect(mockStore.getState().civs.civPool.length).toBe(
        mockCivs.length - 1
      );
    });
  });
});
