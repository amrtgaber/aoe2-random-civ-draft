import { ITechTreeItem } from '../../../../../api/tech-tree-item-api';

import { getMockTechTreeItems } from '../../../../mock-state-service';

import { doSearch } from '.';

describe('search service', () => {
  describe('doSearch', () => {
    let mockItems: ITechTreeItem[] = [];

    beforeEach(() => {
      mockItems = getMockTechTreeItems();
    });

    test('should find items', () => {
      const term = 'a';

      const searchResults = doSearch(mockItems, term);

      expect(searchResults.length).toBeGreaterThan(0);
    });

    test('should be case insensitive', () => {
      const term = 'A';

      const searchResults = doSearch(mockItems, term);

      expect(searchResults.length).toBeGreaterThan(0);
    });

    test('should find one item', () => {
      const term = 'arbalester';

      const searchResults = doSearch(mockItems, term);

      expect(searchResults.length).toBe(1);
      expect(searchResults[0].itemName).toBe('arbalester');
    });

    test('should return all items if search term is blank', () => {
      const searchResults = doSearch(mockItems, '');

      expect(searchResults.length).toBe(mockItems.length);
    });

    test('should return empty array if items list is empty', () => {
      const term = 'a';

      const searchResults = doSearch([], term);

      expect(searchResults.length).toBe(0);
    });
  });
});
