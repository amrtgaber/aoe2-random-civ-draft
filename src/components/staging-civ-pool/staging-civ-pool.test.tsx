import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import { configureTestStore } from '../../store/mock-state-service';

import { StagingCivPool } from '.';

describe('staging civ pool component', () => {
  test('renders staging civ pool', () => {
    const store = configureTestStore();

    const { container: stagingCivPoolContainer } = render(
      <Provider store={store}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    const stagingCivPoolEl =
      stagingCivPoolContainer.querySelector('.staging-civ-pool');
    expect(stagingCivPoolEl).toBeInTheDocument();
  });

  it('adds staging civs to main pool', () => {
    const mockCivs = MOCK_STATE.civs.allCivs;
    const mockCiv1 = mockCivs[0];
    const mockCiv2 = mockCivs[1];

    const store = configureTestStore({
      civs: {
        ...MOCK_STATE.civs,
        civPool: [mockCiv1],
      },
      techTreeFilter: {
        ...MOCK_STATE.techTreeFilter,
        filteredCivPool: [mockCiv2],
      },
    });

    const { container: stagingCivPoolContainer } = render(
      <Provider store={store}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Add to pool'));

    const civPool = store.getState().civs.civPool;

    expect(civPool.length).toBe(2);
    expect(civPool[0].id).toBe(mockCiv1.id);
    expect(civPool[1].id).toBe(mockCiv2.id);
  });

  it('replaces main pool with staging civs', () => {
    const mockCivs = MOCK_STATE.civs.allCivs;
    const mockCiv1 = mockCivs[0];
    const mockCiv2 = mockCivs[1];

    const store = configureTestStore({
      civs: {
        ...MOCK_STATE.civs,
        civPool: [mockCiv1],
      },
      techTreeFilter: {
        ...MOCK_STATE.techTreeFilter,
        filteredCivPool: [mockCiv2],
      },
    });

    const { container: stagingCivPoolContainer } = render(
      <Provider store={store}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Replace pool'));

    const civPool = store.getState().civs.civPool;

    expect(civPool.length).toBe(1);
    expect(civPool[0].id).toBe(mockCiv2.id);
  });

  it('subtracts staging civs from main pool', () => {
    const mockCivs = MOCK_STATE.civs.allCivs;
    const mockCiv1 = mockCivs[0];
    const mockCiv2 = mockCivs[1];

    const store = configureTestStore({
      civs: {
        ...MOCK_STATE.civs,
        civPool: [mockCiv1, mockCiv2],
      },
      techTreeFilter: {
        ...MOCK_STATE.techTreeFilter,
        filteredCivPool: [mockCiv1],
      },
    });

    const { container: stagingCivPoolContainer } = render(
      <Provider store={store}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Subtract from pool'));

    const civPool = store.getState().civs.civPool;

    expect(civPool.length).toBe(1);
    expect(civPool[0].id).toBe(mockCiv2.id);
  });
});
