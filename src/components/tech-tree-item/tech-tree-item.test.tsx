import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureTestStore } from '../../test/shared-test-data';
import { TechTreeItemType } from '../../api/tech-tree-item-api';
import { TechTreeItem } from '.';

describe('tech tree item component', () => {
  describe('renders tech tree item', () => {
    test('renders tech tree item', () => {
      const store = configureTestStore();

      const { container: techTreeItem } = render(
        <Provider store={store}>
          <TechTreeItem
            item={{
              id: 1,
              itemName: 'archer',
              kind: TechTreeItemType.UNIT,
              isUnique: false,
            }}
            selected={false}
          />
        </Provider>
      );

      const techTreeItemEl = techTreeItem.querySelector(
        '.tech-tree-item-container'
      );

      expect(techTreeItemEl).toBeInTheDocument();
    });
  });
});
