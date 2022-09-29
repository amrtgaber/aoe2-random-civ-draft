import { isBuilding } from '../../../../../api/tech-tree-item-api';

import {
  getMockTechTreeBuilding,
  getMockTechTreeItems,
  getMockTechTreeTech,
  getMockTechTreeUnit,
} from '../../../../mock-state-service';

import { doSort, SortBy } from '.';

describe('sort service', () => {
  describe('doSort', () => {
    test('should sort by a-z', () => {
      const mockItems = getMockTechTreeItems();
      const itemsToSort = [mockItems[1], mockItems[0]];

      const sortedItems = doSort(itemsToSort, SortBy.ALPHA);

      expect(sortedItems[0].id).toBe(mockItems[0].id);
      expect(sortedItems[1].id).toBe(mockItems[1].id);
    });

    test('should sort by age', () => {
      const mockItems = getMockTechTreeItems();

      const mockDarkAgeItem = mockItems[0];
      mockDarkAgeItem.age!.id = 1;

      const mockFeudalAgeItem = mockItems[1];
      mockFeudalAgeItem.age!.id = 2;

      const itemsToSort = [mockFeudalAgeItem, mockDarkAgeItem];

      const sortedItems = doSort(itemsToSort, SortBy.AGE);

      expect(sortedItems[0].id).toBe(mockDarkAgeItem.id);
      expect(sortedItems[1].id).toBe(mockFeudalAgeItem.id);
    });

    test('should sort by building', () => {
      const mockUnit = getMockTechTreeUnit();
      const mockTech = getMockTechTreeTech();
      const mockBuilding = getMockTechTreeBuilding();

      mockUnit.buildings[0].id = 1;
      mockTech.buildings[0].id = 2;

      const itemsToSort = [mockBuilding, mockTech, mockUnit];

      const sortedItems = doSort(itemsToSort, SortBy.BUILDING);

      expect(sortedItems[0].id).toBe(mockUnit.id);
      expect(sortedItems[1].id).toBe(mockTech.id);
      expect(sortedItems.every((item) => !isBuilding(item))).toBe(true);
    });

    test('should sort by kind', () => {
      const mockUnit = getMockTechTreeUnit();
      const mockTech = getMockTechTreeTech();
      const mockBuilding = getMockTechTreeBuilding();

      const itemsToSort = [mockBuilding, mockTech, mockUnit];

      const sortedItems = doSort(itemsToSort, SortBy.KIND);

      expect(sortedItems[0].id).toBe(mockUnit.id);
      expect(sortedItems[1].id).toBe(mockTech.id);
      expect(sortedItems[2].id).toBe(mockBuilding.id);
    });
  });
});
