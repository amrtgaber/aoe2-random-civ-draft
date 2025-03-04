import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import {
  configureMockStore,
  getMockTechTreeUnit,
} from '../../../store/mock-state-service';
import { techTreeFilterInitialState } from '../../../store/slices/tech-tree-filter-slice';

import { TechTreeItem } from '.';

describe('tech tree item component', () => {
  test('renders tech tree item', () => {
    const mockUnit = getMockTechTreeUnit();
    const mockStore = configureMockStore();

    const { container: techTreeItemContainer } = render(
      <Provider store={mockStore}>
        <TechTreeItem item={mockUnit} selected={false} />
      </Provider>,
    );

    const techTreeItemEl = techTreeItemContainer.querySelector(
      '.tech-tree-item-container',
    );

    expect(techTreeItemEl).toBeInTheDocument();
  });

  describe('animation classes', () => {
    test('adds animation on select', () => {
      const mockUnit = getMockTechTreeUnit();
      const mockStore = configureMockStore();

      const { container: techTreeItemContainer } = render(
        <Provider store={mockStore}>
          <TechTreeItem item={mockUnit} selected={false} />
        </Provider>,
      );

      fireEvent.click(screen.getByText(mockUnit.itemName));

      const selectedAnimationClassEl =
        techTreeItemContainer.querySelector('.leave-unselected');

      expect(selectedAnimationClassEl).toBeInTheDocument();
    });

    test('adds animation on deselect', () => {
      const mockUnit = getMockTechTreeUnit();
      const mockStore = configureMockStore();

      const { container: techTreeItemContainer } = render(
        <Provider store={mockStore}>
          <TechTreeItem item={mockUnit} selected={true} />
        </Provider>,
      );

      fireEvent.click(screen.getByText(mockUnit.itemName));

      const deselectedAnimationClassEl =
        techTreeItemContainer.querySelector('.leave-selected');

      expect(deselectedAnimationClassEl).toBeInTheDocument();
    });
  });

  describe('updates state', () => {
    test('updates state on select', () => {
      const mockUnit = getMockTechTreeUnit();

      const mockStore = configureMockStore({
        techTreeFilter: {
          ...techTreeFilterInitialState,
          shownItems: [mockUnit],
        },
      });

      const { container: techTreeItemContainer } = render(
        <Provider store={mockStore}>
          <TechTreeItem item={mockUnit} selected={false} />
        </Provider>,
      );

      expect(mockStore.getState().techTreeFilter.itemsFilter.length).toBe(0);
      expect(mockStore.getState().techTreeFilter.shownItems.length).toBe(1);

      fireEvent.transitionEnd(screen.getByText(mockUnit.itemName));

      expect(mockStore.getState().techTreeFilter.itemsFilter.length).toBe(1);
      expect(mockStore.getState().techTreeFilter.itemsFilter[0].id).toBe(
        mockUnit.id,
      );
      expect(mockStore.getState().techTreeFilter.shownItems.length).toBe(0);
    });

    test('updates state on deselect', () => {
      const mockUnit = getMockTechTreeUnit();

      const mockStore = configureMockStore({
        techTreeFilter: {
          ...techTreeFilterInitialState,
          itemsFilter: [mockUnit],
          taggedItems: [mockUnit],
        },
      });

      const { container: techTreeItemContainer } = render(
        <Provider store={mockStore}>
          <TechTreeItem item={mockUnit} selected={true} />
        </Provider>,
      );

      expect(mockStore.getState().techTreeFilter.itemsFilter.length).toBe(1);
      expect(mockStore.getState().techTreeFilter.shownItems.length).toBe(0);

      fireEvent.transitionEnd(screen.getByText(mockUnit.itemName));

      expect(mockStore.getState().techTreeFilter.itemsFilter.length).toBe(0);
      expect(mockStore.getState().techTreeFilter.shownItems.length).toBe(1);
      expect(mockStore.getState().techTreeFilter.shownItems[0].id).toBe(
        mockUnit.id,
      );
    });
  });
});
