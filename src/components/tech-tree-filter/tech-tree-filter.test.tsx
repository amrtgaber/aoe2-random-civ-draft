import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import { configureMockStore } from '../../store/mock-state-service';

import { TechTreeFilter } from '.';

describe('tech tree filter component', () => {
  test('renders tech tree filter', () => {
    const mockStore = configureMockStore();

    const { container: techTreeFilterContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilter />
      </Provider>
    );

    const techTreeFilterEl = techTreeFilterContainer.querySelector(
      '.tech-tree-filter-container'
    );

    expect(techTreeFilterEl).toBeInTheDocument();
  });

  test('updates state after fetch', () => {
    const mockStore = configureMockStore({
      units: MOCK_STATE.units,
      techs: MOCK_STATE.techs,
      buildings: MOCK_STATE.buildings,
      ages: MOCK_STATE.ages,
    });

    const { container: techTreeFilterContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilter />
      </Provider>
    );

    const taggedItems = mockStore.getState().techTreeFilter.taggedItems;

    expect(taggedItems.length).toBeGreaterThan(0);
  });

  test('renders a selected item', () => {
    const mockUnit = MOCK_STATE.units.allUnits[0];

    const mockStore = configureMockStore({
      units: MOCK_STATE.units,
      techs: MOCK_STATE.techs,
      buildings: MOCK_STATE.buildings,
      ages: MOCK_STATE.ages,
      techTreeFilter: MOCK_STATE.techTreeFilter,
    });

    const { container: techTreeFilterContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilter />
      </Provider>
    );

    fireEvent.click(screen.getByText(mockUnit.itemName));

    const selectedEl = techTreeFilterContainer.querySelector(
      '.tech-tree-filter-selected-items .unit'
    );

    expect(selectedEl).toBeInTheDocument();
  });
});
