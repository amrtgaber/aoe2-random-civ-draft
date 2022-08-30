import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import unitsReducer from '../../store/units-slice';
import techsReducer from '../../store/techs-slice';
import buildingsReducer from '../../store/buildings-slice';
import { TechTreeFilter } from '.';

describe('tech tree filter component', () => {
  const reducer = {
    units: unitsReducer,
    techs: techsReducer,
    buildings: buildingsReducer,
  };

  describe('renders tech tree filter', () => {
    test('renders tech tree filter', () => {
      const store = configureStore({ reducer });

      const { container: techTreeFilter } = render(
        <Provider store={store}>
          <TechTreeFilter />
        </Provider>
      );

      const techTreeFilterEl = techTreeFilter.querySelector(
        '.tech-tree-filter-container'
      );

      expect(techTreeFilterEl).toBeInTheDocument();
    });
  });
});
