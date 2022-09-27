import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import { configureMockStore } from '../../store/mock-state-service';
import { FetchStatus } from '../../store/fetch-status-service';

import { StagingCivPool } from '.';

describe('staging civ pool component', () => {
  it('renders staging civ pool', () => {
    const mockStore = configureMockStore();

    const { container: stagingCivPoolContainer } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    const stagingCivPoolEl =
      stagingCivPoolContainer.querySelector('.staging-civ-pool');
    expect(stagingCivPoolEl).toBeInTheDocument();
  });

  it('renders loading component', () => {
    const mockStore = configureMockStore({
      civs: {
        ...MOCK_STATE.civs,
        civsStatus: FetchStatus.LOADING,
      },
    });

    const { container: stagingCivPoolContainer } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    const loadingEl = stagingCivPoolContainer.querySelector('.loading-text');
    expect(loadingEl).toBeInTheDocument();
  });

  it('adds staging civs to main pool', () => {
    const mockCivs = MOCK_STATE.civs.allCivs;
    const mockCiv1 = mockCivs[0];
    const mockCiv2 = mockCivs[1];

    const mockStore = configureMockStore({
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
      <Provider store={mockStore}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Add to pool'));

    const civPool = mockStore.getState().civs.civPool;

    expect(civPool.length).toBe(2);
    expect(civPool[0].id).toBe(mockCiv1.id);
    expect(civPool[1].id).toBe(mockCiv2.id);
  });

  it('replaces main pool with staging civs', () => {
    const mockCivs = MOCK_STATE.civs.allCivs;
    const mockCiv1 = mockCivs[0];
    const mockCiv2 = mockCivs[1];

    const mockStore = configureMockStore({
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
      <Provider store={mockStore}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Replace pool'));

    const civPool = mockStore.getState().civs.civPool;

    expect(civPool.length).toBe(1);
    expect(civPool[0].id).toBe(mockCiv2.id);
  });

  it('subtracts staging civs from main pool', () => {
    const mockCivs = MOCK_STATE.civs.allCivs;
    const mockCiv1 = mockCivs[0];
    const mockCiv2 = mockCivs[1];

    const mockStore = configureMockStore({
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
      <Provider store={mockStore}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Subtract from pool'));

    const civPool = mockStore.getState().civs.civPool;

    expect(civPool.length).toBe(1);
    expect(civPool[0].id).toBe(mockCiv2.id);
  });
});
