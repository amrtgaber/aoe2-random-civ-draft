import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import { configureMockStore } from '../../store/mock-state-service';

import { CivPool } from '.';

describe('civ pool component', () => {
  test('renders civ pool', () => {
    const mockStore = configureMockStore();

    const { container: civPoolContainer } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CivPool />
        </MemoryRouter>
      </Provider>
    );

    const civPoolEl = civPoolContainer.querySelector('.civ-pool-title');
    expect(civPoolEl).toBeInTheDocument();
  });

  describe('civ pool init', () => {
    test('updates civ pool from query params', () => {
      const mockStore = configureMockStore({
        civs: MOCK_STATE.civs,
      });

      const { container: civPoolContainer } = render(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['?civPool=Aztecs,Vikings']}>
            <CivPool />
          </MemoryRouter>
        </Provider>
      );

      expect(mockStore.getState().civs.civPool.length).toBe(2);
    });
  });

  describe('listens to civ pool changes', () => {
    test('updates query params when civ pool changes', () => {
      const mockStore = configureMockStore({
        civs: MOCK_STATE.civs,
      });

      const { container: civPoolContainer } = render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <CivPool />
          </BrowserRouter>
        </Provider>
      );

      expect(location.search).not.toContain('civPool=Aztecs');
      fireEvent.click(screen.getByText('Aztecs'));
      expect(location.search).toContain('civPool=Aztecs');
    });
  });
});
