import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../../store/mock-state-service/mock-state';
import { configureMockStore } from '../../../store/mock-state-service';
import { FilterMode } from '../../../store/slices/tech-tree-filter-slice';
import { SortBy } from '../../../store/slices/tech-tree-filter-slice/tech-tree-filter-service/sort-service';

import { TechTreeFilterOptions } from '.';

describe('tech tree filter options component', () => {
  test('renders tech tree filter options', () => {
    const mockStore = configureMockStore();

    const { container: techTreeFilterOptionsContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilterOptions />
      </Provider>,
    );

    const techTreeFilterOptionsEl =
      techTreeFilterOptionsContainer.querySelector('.tech-tree-filter-options');

    expect(techTreeFilterOptionsEl).toBeInTheDocument();
  });

  test('toggles the filter mode', () => {
    const mockStore = configureMockStore();

    const { container: techTreeFilterOptionsContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilterOptions />
      </Provider>,
    );

    fireEvent.click(screen.getByText('ALL'));
    expect(mockStore.getState().techTreeFilter.filterMode).toBe(
      FilterMode.HAS_ANY,
    );

    fireEvent.click(screen.getByText('ANY'));
    expect(mockStore.getState().techTreeFilter.filterMode).toBe(
      FilterMode.HAS_ALL,
    );
  });

  test('clears items filter', () => {
    const mockStore = configureMockStore({
      techTreeFilter: MOCK_STATE.techTreeFilter,
    });

    const { container: techTreeFilterOptionsContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilterOptions />
      </Provider>,
    );

    expect(
      mockStore.getState().techTreeFilter.itemsFilter.length,
    ).toBeGreaterThan(0);

    fireEvent.click(screen.getByText('Clear selections'));
    expect(mockStore.getState().techTreeFilter.itemsFilter.length).toBe(0);
  });

  test('sets sort mode', () => {
    const mockStore = configureMockStore({
      techTreeFilter: MOCK_STATE.techTreeFilter,
    });

    const { container: techTreeFilterOptionsContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilterOptions />
      </Provider>,
    );

    expect(mockStore.getState().techTreeFilter.sortMode).toBe(SortBy.ALPHA);

    const selectEl =
      techTreeFilterOptionsContainer.querySelector('.sort-dropdown')!;

    fireEvent.change(
      selectEl,
      createEvent('change', selectEl, { target: { value: SortBy.AGE } }),
    );

    expect(mockStore.getState().techTreeFilter.sortMode).toBe(SortBy.AGE);
  });
});
