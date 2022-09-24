import {
  getMockTechTreeItems,
  getMockTechTreeUnit,
} from '../../mock-state-service';
import { SortBy } from './tech-tree-filter-service/sort-service';
import { getTagByName } from './tech-tree-filter-service/tags-service';

import techTreeFilterReducer, {
  addItemToFilter,
  addShownItem,
  clearItemsFilter,
  FilterMode,
  removeItemFromFilter,
  removeShownItem,
  setFilterMode,
  setItemsFilter,
  setSearchTerm,
  setSelectedTags,
  setShownItems,
  setSortMode,
  setTaggedItems,
  techTreeFilterInitialState,
} from '.';

describe('techTreeFilter reducer', () => {
  it('should handle initial load', () => {
    expect(techTreeFilterReducer(undefined, { type: 'unkown' })).toEqual(
      techTreeFilterInitialState
    );
  });

  describe('items filter', () => {
    it('should add item to filter', () => {
      const mockUnit = getMockTechTreeUnit();

      const startState = { ...techTreeFilterInitialState };

      const endState = techTreeFilterReducer(
        startState,
        addItemToFilter(mockUnit)
      );

      expect(endState.itemsFilter.length).toBe(1);
      expect(endState.itemsFilter[0].id).toBe(mockUnit.id);
    });

    it('should remove item from filter', () => {
      const mockUnit = getMockTechTreeUnit();

      const startState = {
        ...techTreeFilterInitialState,
        itemsFilter: [mockUnit],
      };

      const endState = techTreeFilterReducer(
        startState,
        removeItemFromFilter(mockUnit)
      );

      expect(endState.itemsFilter.length).toBe(0);
    });

    it('should set items filter', () => {
      const mockItems = getMockTechTreeItems();

      const startState = { ...techTreeFilterInitialState };

      const endState = techTreeFilterReducer(
        startState,
        setItemsFilter(mockItems)
      );

      expect(endState.itemsFilter.length).toBe(mockItems.length);
    });

    it('should clear items filter', () => {
      const mockItems = getMockTechTreeItems();

      const startState = {
        ...techTreeFilterInitialState,
        itemsFilter: mockItems,
      };

      const endState = techTreeFilterReducer(startState, clearItemsFilter());

      expect(endState.itemsFilter.length).toBe(0);
    });
  });

  it('should set filter mode', () => {
    const startState = {
      ...techTreeFilterInitialState,
      filterMode: FilterMode.HAS_ALL,
    };

    const endState = techTreeFilterReducer(
      startState,
      setFilterMode(FilterMode.HAS_ANY)
    );

    expect(endState.filterMode).toEqual(FilterMode.HAS_ANY);
  });

  it('should set tagged items', () => {
    const mockItems = getMockTechTreeItems();

    const startState = { ...techTreeFilterInitialState };

    const endState = techTreeFilterReducer(
      startState,
      setTaggedItems(mockItems)
    );

    expect(endState.taggedItems.length).toBe(mockItems.length);
  });

  describe('shown items', () => {
    it('should add shown item', () => {
      const mockUnit = getMockTechTreeUnit();

      const startState = {
        ...techTreeFilterInitialState,
        taggedItems: [mockUnit],
      };

      const endState = techTreeFilterReducer(
        startState,
        addShownItem(mockUnit)
      );

      expect(endState.shownItems.length).toBe(1);
      expect(endState.shownItems[0].id).toBe(mockUnit.id);
    });

    it('should remove shown item', () => {
      const mockUnit = getMockTechTreeUnit();

      const startState = {
        ...techTreeFilterInitialState,
        taggedItems: [mockUnit],
        shownItems: [mockUnit],
      };

      const endState = techTreeFilterReducer(
        startState,
        removeShownItem(mockUnit)
      );

      expect(endState.shownItems.length).toBe(0);
    });

    it('should set shown items', () => {
      const mockItems = getMockTechTreeItems();

      const startState = {
        ...techTreeFilterInitialState,
        taggedItems: mockItems,
      };

      const endState = techTreeFilterReducer(
        startState,
        setShownItems(mockItems)
      );

      expect(endState.shownItems.length).toBe(mockItems.length);
    });
  });

  it('should set search term', () => {
    const mockSearchTerm = 'test';

    const startState = { ...techTreeFilterInitialState };

    const endState = techTreeFilterReducer(
      startState,
      setSearchTerm(mockSearchTerm)
    );

    expect(endState.searchTerm).toBe(mockSearchTerm);
  });

  it('should set sort mode', () => {
    const startState = { ...techTreeFilterInitialState };

    const endState = techTreeFilterReducer(startState, setSortMode(SortBy.AGE));

    expect(endState.sortMode).toBe(SortBy.AGE);
  });

  it('should set selected tags', () => {
    const selectedTag = getTagByName('units');

    const startState = { ...techTreeFilterInitialState };

    const endState = techTreeFilterReducer(
      startState,
      setSelectedTags([selectedTag])
    );

    expect(endState.selectedTags.length).toBe(1);
    expect(endState.selectedTags[0].id).toBe(selectedTag.id);
  });
});
