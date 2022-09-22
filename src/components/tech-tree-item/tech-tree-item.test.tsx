import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureTestStore } from '../../test/shared-test-data';
import { TechTreeItemType } from '../../api/tech-tree-item-api';
import { TechTreeItem } from '.';
import { IUnit } from '../../api/units/units-api';

describe('tech tree item component', () => {
  describe('renders tech tree item', () => {
    test('renders tech tree item', () => {
      const store = configureTestStore();

      const { container: techTreeItem } = render(
        <Provider store={store}>
          <TechTreeItem
            item={
              {
                id: 1,
                itemName: 'archer',
                kind: TechTreeItemType.UNIT,
                isUnique: false,
                age: {
                  id: 2,
                  ageName: 'feudal age',
                },
                buildings: [{ itemName: 'archery range' }],
              } as IUnit
            }
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
