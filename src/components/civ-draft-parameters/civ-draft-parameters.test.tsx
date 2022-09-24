import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import {
  configureMockStore,
  getMockCivs,
} from '../../store/mock-state-service';

import { CivDraftParameters } from '.';

describe('civ draft parameters component', () => {
  describe('renders civ draft parameters', () => {
    it('renders civ draft parameters', () => {
      const mockStore = configureMockStore();

      const { container: civDraftParameters } = render(
        <Provider store={mockStore}>
          <CivDraftParameters />
        </Provider>
      );

      const civDraftParametersEl = civDraftParameters.querySelector(
        '.civ-draft-parameters'
      );

      expect(civDraftParametersEl).toBeInTheDocument();
    });
  });

  describe('add all, remove, and invert selection', () => {
    it('adds all civs to pool', () => {
      const mockCivs = getMockCivs();

      const mockStore = configureMockStore({
        civs: MOCK_STATE.civs,
      });

      const { container: civDraftParameters } = render(
        <Provider store={mockStore}>
          <CivDraftParameters />
        </Provider>
      );

      expect(mockStore.getState().civs.civPool.length).toBe(0);
      fireEvent.click(screen.getByText('Add all civs'));
      expect(mockStore.getState().civs.civPool.length).toBe(mockCivs.length);
    });

    it('removes all civs from pool', () => {
      const mockCivs = getMockCivs();

      const mockStore = configureMockStore({
        civs: {
          ...MOCK_STATE.civs,
          civPool: mockCivs,
        },
      });

      const { container: civDraftParameters } = render(
        <Provider store={mockStore}>
          <CivDraftParameters />
        </Provider>
      );

      expect(mockStore.getState().civs.civPool.length).toBe(mockCivs.length);
      fireEvent.click(screen.getByText('Reset'));
      expect(mockStore.getState().civs.civPool.length).toBe(0);
    });

    it('inverts civ pool selection', () => {
      const mockCivs = getMockCivs();

      const mockStore = configureMockStore({
        civs: {
          ...MOCK_STATE.civs,
          civPool: [mockCivs[0]],
        },
      });

      const { container: civDraftParameters } = render(
        <Provider store={mockStore}>
          <CivDraftParameters />
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
