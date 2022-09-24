import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureMockStore } from '../../store/mock-state-service';

import { TechTreeFilterTags } from '.';

describe('tech tree filter tags component', () => {
  describe('renders tech tree filter tags', () => {
    it('renders tech tree filter tags', () => {
      const mockStore = configureMockStore();

      const { container: techTreeFilterTags } = render(
        <Provider store={mockStore}>
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
