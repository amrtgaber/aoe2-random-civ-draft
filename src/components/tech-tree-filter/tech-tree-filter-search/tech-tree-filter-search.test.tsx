import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../../store/mock-state-service/mock-state';
import { configureMockStore } from '../../../store/mock-state-service';

import { TechTreeFilterSearch } from '.';

describe('tech tree filter search component', () => {
  it('renders tech tree filter search', () => {
    const mockStore = configureMockStore();

    const { container: techTreeFilterSearchContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilterSearch />
      </Provider>
    );

    const techTreeFilterSearchEl = techTreeFilterSearchContainer.querySelector(
      '.tech-tree-filter-search'
    );

    expect(techTreeFilterSearchEl).toBeInTheDocument();
  });

  it('sets search term', () => {
    const mockStore = configureMockStore();

    const { container: techTreeFilterSearchContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilterSearch />
      </Provider>
    );

    const inputEl =
      techTreeFilterSearchContainer.querySelector('.search-input')!;

    fireEvent.change(
      inputEl,
      createEvent('input', inputEl, { target: { value: 'a' } })
    );

    expect(mockStore.getState().techTreeFilter.searchTerm).toBe('a');
  });

  it('clears search term', () => {
    const mockStore = configureMockStore({
      techTreeFilter: {
        ...MOCK_STATE.techTreeFilter,
        searchTerm: 'test',
      },
    });

    const { container: techTreeFilterSearchContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilterSearch />
      </Provider>
    );

    expect(
      mockStore.getState().techTreeFilter.searchTerm.length
    ).toBeGreaterThan(0);

    fireEvent.click(screen.getByText('✖'));

    expect(mockStore.getState().techTreeFilter.searchTerm).toBe('');
  });
});
