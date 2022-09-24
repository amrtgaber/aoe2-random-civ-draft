import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import { configureMockStore } from '../../store/mock-state-service';

import { CivDraft } from '.';

describe('civ draft component', () => {
  it('renders civ draft', () => {
    const mockStore = configureMockStore();

    const { container: civDraftContainer } = render(
      <Provider store={mockStore}>
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
      const mockStore = configureMockStore({
        civs: MOCK_STATE.civs,
      });

      const { container: civDraftContainer } = render(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['?civPool=Aztecs,Vikings']}>
            <CivDraft />
          </MemoryRouter>
        </Provider>
      );

      expect(mockStore.getState().civs.civPool.length).toBe(2);
    });
  });

  describe('listens to civ pool changes', () => {
    it('updates query params when civ pool changes', () => {
      const mockStore = configureMockStore({
        civs: MOCK_STATE.civs,
      });

      const { container: civDraftContainer } = render(
        <Provider store={mockStore}>
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
