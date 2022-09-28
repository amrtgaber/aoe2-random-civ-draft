import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../../store/mock-state-service/mock-state';
import {
  configureMockStore,
  getMockCiv,
} from '../../../store/mock-state-service';
import { FetchStatus } from '../../../store/fetch-status-service';

import { DraftCivButton } from '.';

describe('draft civ button component', () => {
  describe('renders draft civ button', () => {
    it('renders draft civ button', () => {
      const mockStore = configureMockStore();

      const { container: draftCivButtonContainer } = render(
        <Provider store={mockStore}>
          <DraftCivButton />
        </Provider>
      );

      expect(screen.getByText('Draft Civ')).toBeInTheDocument();
    });
  });

  describe('drafts a civ', () => {
    it('drafts a civ on button click', () => {
      const mockStore = configureMockStore({
        civs: MOCK_STATE.civs,
      });

      const { container: draftCivButtonContainer } = render(
        <Provider store={mockStore}>
          <DraftCivButton />
        </Provider>
      );

      expect(mockStore.getState().draftResult.draftCount).toBe(0);
      fireEvent.click(screen.getByText('Draft Civ'));
      expect(mockStore.getState().draftResult.draftCount).toBe(1);
    });

    it('does not draft civ before fetch success', () => {
      const mockStore = configureMockStore({
        civs: {
          ...MOCK_STATE.civs,
          civsStatus: FetchStatus.LOADING,
        },
      });

      const { container: draftCivButtonContainer } = render(
        <Provider store={mockStore}>
          <DraftCivButton />
        </Provider>
      );

      expect(mockStore.getState().draftResult.draftCount).toBe(0);
      fireEvent.click(screen.getByText('Draft Civ'));
      expect(mockStore.getState().draftResult.draftCount).toBe(0);
    });

    it('only drafts civs from civ pool if civ pool is not empty', () => {
      const mockCiv = getMockCiv();
      const mockCivName = mockCiv.civName;

      const mockStore = configureMockStore({
        civs: {
          ...MOCK_STATE.civs,
          civPool: [mockCiv],
        },
      });

      const { container: draftCivButtonContainer } = render(
        <Provider store={mockStore}>
          <DraftCivButton />
        </Provider>
      );

      expect(mockStore.getState().draftResult.draftCount).toBe(0);

      fireEvent.click(screen.getByText('Draft Civ'));
      expect(mockStore.getState().draftResult.civ?.civName).toBe(mockCivName);

      fireEvent.click(screen.getByText('Draft Civ'));
      expect(mockStore.getState().draftResult.civ?.civName).toBe(mockCivName);

      fireEvent.click(screen.getByText('Draft Civ'));
      expect(mockStore.getState().draftResult.civ?.civName).toBe(mockCivName);

      fireEvent.click(screen.getByText('Draft Civ'));
      expect(mockStore.getState().draftResult.civ?.civName).toBe(mockCivName);

      expect(mockStore.getState().draftResult.draftCount).toBe(4);
    });
  });
});
