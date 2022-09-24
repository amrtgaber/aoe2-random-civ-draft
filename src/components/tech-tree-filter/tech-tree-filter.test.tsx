import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureMockStore } from '../../store/mock-state-service';

import { TechTreeFilter } from '.';

describe('tech tree filter component', () => {
  describe('renders tech tree filter', () => {
    it('renders tech tree filter', () => {
      const mockStore = configureMockStore();

      const { container: techTreeFilter } = render(
        <Provider store={mockStore}>
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
