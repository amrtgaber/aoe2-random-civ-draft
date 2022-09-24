import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureMockStore } from '../../store/mock-state-service';

import { TechTreeFilterSearch } from '.';

describe('tech tree filter search component', () => {
  describe('renders tech tree filter search', () => {
    it('renders tech tree filter search', () => {
      const mockStore = configureMockStore();

      const { container: techTreeFilterSearch } = render(
        <Provider store={mockStore}>
          <TechTreeFilterSearch />
        </Provider>
      );

      const techTreeFilterSearchEl = techTreeFilterSearch.querySelector(
        '.tech-tree-filter-search'
      );

      expect(techTreeFilterSearchEl).toBeInTheDocument();
    });
  });
});
