import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../../store/mock-state-service/mock-state';
import { configureMockStore } from '../../../store/mock-state-service';
import { filterTags } from '../../../store/slices/tech-tree-filter-slice/tech-tree-filter-service/tags-service/tags';

import { TechTreeFilterTags } from '.';

describe('tech tree filter tags component', () => {
  test('renders tech tree filter tags', () => {
    const mockStore = configureMockStore();

    const { container: techTreeFilterTagsContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilterTags />
      </Provider>,
    );

    const techTreeFilterTagsEl = techTreeFilterTagsContainer.querySelector(
      '.tech-tree-filter-tags',
    );

    expect(techTreeFilterTagsEl).toBeInTheDocument();
  });

  describe('toggle filter tag', () => {
    test('selects filter tag', () => {
      const mockTag = filterTags[0];
      const mockStore = configureMockStore();

      const { container: techTreeFilterTagsContainer } = render(
        <Provider store={mockStore}>
          <TechTreeFilterTags />
        </Provider>,
      );

      expect(mockStore.getState().techTreeFilter.selectedTags.length).toBe(0);

      fireEvent.click(screen.getByText(mockTag.tagName));

      expect(mockStore.getState().techTreeFilter.selectedTags.length).toBe(1);
      expect(mockStore.getState().techTreeFilter.selectedTags[0].id).toBe(
        mockTag.id,
      );
    });

    test('deselects filter tag', () => {
      const mockTag = filterTags[0];
      const mockStore = configureMockStore({
        techTreeFilter: {
          ...MOCK_STATE.techTreeFilter,
          selectedTags: [mockTag],
        },
      });

      const { container: techTreeFilterTagsContainer } = render(
        <Provider store={mockStore}>
          <TechTreeFilterTags />
        </Provider>,
      );

      expect(mockStore.getState().techTreeFilter.selectedTags.length).toBe(1);

      fireEvent.click(screen.getByText(mockTag.tagName));

      expect(mockStore.getState().techTreeFilter.selectedTags.length).toBe(0);
    });
  });

  test('clears selected tags', () => {
    const mockTags = filterTags;

    const mockStore = configureMockStore({
      techTreeFilter: {
        ...MOCK_STATE.techTreeFilter,
        selectedTags: mockTags,
      },
    });

    const { container: techTreeFilterTagsContainer } = render(
      <Provider store={mockStore}>
        <TechTreeFilterTags />
      </Provider>,
    );

    expect(
      mockStore.getState().techTreeFilter.selectedTags.length,
    ).toBeGreaterThan(0);

    fireEvent.click(screen.getByText('clear filters'));

    expect(mockStore.getState().techTreeFilter.selectedTags.length).toBe(0);
  });
});
