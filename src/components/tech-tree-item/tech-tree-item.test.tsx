import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import {
  configureMockStore,
  getMockTechTreeUnit,
} from '../../store/mock-state-service';

import { TechTreeItem } from '.';

describe('tech tree item component', () => {
  describe('renders tech tree item', () => {
    it('renders tech tree item', () => {
      const mockUnit = getMockTechTreeUnit();
      const mockStore = configureMockStore();

      const { container: techTreeItem } = render(
        <Provider store={mockStore}>
          <TechTreeItem item={mockUnit} selected={false} />
        </Provider>
      );

      const techTreeItemEl = techTreeItem.querySelector(
        '.tech-tree-item-container'
      );

      expect(techTreeItemEl).toBeInTheDocument();
    });
  });
});
