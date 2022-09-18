import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureTestStore } from '../../test/shared-test-data';
import { TechTreeFilterOptions } from '.';

describe('tech tree filter options component', () => {
  describe('renders tech tree filter options', () => {
    test('renders tech tree filter options', () => {
      const store = configureTestStore();

      const { container: techTreeFilterOptions } = render(
        <Provider store={store}>
          <TechTreeFilterOptions />
        </Provider>
      );

      const techTreeFilterOptionsEl = techTreeFilterOptions.querySelector(
        '.tech-tree-filter-options'
      );

      expect(techTreeFilterOptionsEl).toBeInTheDocument();
    });
  });
});
