import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureTestStore } from '../../store/mock-state-service';

import { TechTreeFilterTags } from '.';

describe('tech tree filter tags component', () => {
  describe('renders tech tree filter tags', () => {
    test('renders tech tree filter tags', () => {
      const store = configureTestStore();

      const { container: techTreeFilterTags } = render(
        <Provider store={store}>
          <TechTreeFilterTags />
        </Provider>
      );

      const techTreeFilterTagsEl = techTreeFilterTags.querySelector(
        '.tech-tree-filter-tags'
      );

      expect(techTreeFilterTagsEl).toBeInTheDocument();
    });
  });
});
