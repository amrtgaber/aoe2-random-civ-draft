import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureTestStore } from '../../test/shared-test-data';
import { TechTreeFilterSearch } from '.';

describe('tech tree filter search component', () => {
  describe('renders tech tree filter search', () => {
    test('renders tech tree filter search', () => {
      const store = configureTestStore();

      const { container: techTreeFilterSearch } = render(
        <Provider store={store}>
          <TechTreeFilterSearch />
        </Provider>
      );

      const techTreeFilterSearchEl = techTreeFilterSearch.querySelector(
        '.tech-tree-filter-search-panel'
      );

      expect(techTreeFilterSearchEl).toBeInTheDocument();
    });
  });
});
