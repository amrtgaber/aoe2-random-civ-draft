import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import unitsReducer from '../../store/units-slice';
import techsReducer from '../../store/techs-slice';
import buildingsReducer from '../../store/buildings-slice';
import { TechTreeItem } from '.';
import { TechTreeItemType } from '../../api/tech-tree-item-api';

describe('tech tree item component', () => {
  const reducer = {
    units: unitsReducer,
    techs: techsReducer,
    buildings: buildingsReducer,
  };

  describe('renders tech tree item', () => {
    test('renders tech tree item', () => {
      const store = configureStore({ reducer });

      const { container: techTreeItem } = render(
        <Provider store={store}>
          <TechTreeItem
            item={{ id: 1, itemName: 'archer', kind: TechTreeItemType.UNIT }}
            selected={false}
          />
        </Provider>
      );

      const techTreeItemEl = techTreeItem.querySelector(
        '.tech-tree-filter-container'
      );

      expect(techTreeItemEl).toBeInTheDocument();
    });
  });
});
