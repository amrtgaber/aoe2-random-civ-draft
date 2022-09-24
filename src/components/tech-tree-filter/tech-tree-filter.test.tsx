import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureTestStore } from '../../store/mock-state-service';

import { TechTreeFilter } from '.';

describe('tech tree filter component', () => {
  describe('renders tech tree filter', () => {
    test('renders tech tree filter', () => {
      const store = configureTestStore();

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
