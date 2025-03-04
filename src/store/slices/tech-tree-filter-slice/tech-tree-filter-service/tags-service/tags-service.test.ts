import {
  isBuilding,
  isTech,
  isUnit,
  ITechTreeItem,
  TechTreeItemType,
} from '../../../../../api/tech-tree-item-api';
import { IUnit } from '../../../../../api/units/units-api';

import {
  getMockTechTreeBuilding,
  getMockTechTreeBuildings,
  getMockTechTreeItems,
  getMockTechTreeTech,
  getMockTechTreeUnit,
} from '../../../../mock-state-service';
import { TagType } from './tags';

import {
  addTagsToItem,
  doFilter,
  filterByTagType,
  filterByUnique,
  getTagByName,
  tagsMap,
} from '.';

describe('tags service', () => {
  describe('get tag by name', () => {
    test('returns a tag', () => {
      const tag = getTagByName('units');
      expect(tag.tagName).toBe('units');
    });

    test('throws if tag is not found', () => {
      expect(() => getTagByName('')).toThrow();
    });
  });

  describe('addTagsToItem', () => {
    test('should add units tag to unit', () => {
      const mockUnit = getMockTechTreeUnit();
      mockUnit.tagIds = [];

      const taggedItem = addTagsToItem(mockUnit);

      expect(taggedItem.tagIds).toContain(getTagByName('units').id);
    });

    test('should add techs tag to tech', () => {
      const mockTech = getMockTechTreeTech();
      mockTech.tagIds = [];

      const taggedItem = addTagsToItem(mockTech);

      expect(taggedItem.tagIds).toContain(getTagByName('techs').id);
    });

    test('should add buildings tag to building', () => {
      const mockBuilding = getMockTechTreeBuilding();
      mockBuilding.tagIds = [];

      const taggedItem = addTagsToItem(mockBuilding);

      expect(taggedItem.tagIds).toContain(getTagByName('buildings').id);
    });

    test('should add uniques tag to unique', () => {
      const mockUnique = getMockTechTreeItems().find(
        (item) => item.isUnique,
      ) as ITechTreeItem;

      mockUnique.tagIds = [];

      const taggedItem = addTagsToItem(mockUnique);

      expect(taggedItem.tagIds).toContain(getTagByName('uniques').id);
    });

    test('should add age tag to item', () => {
      const mockUnit = getMockTechTreeUnit();
      mockUnit.tagIds = [];

      const ageTagId = getTagByName(mockUnit.age.ageName).id;

      const taggedItem = addTagsToItem(mockUnit);

      expect(taggedItem.tagIds).toContain(ageTagId);
    });

    test('should add building tags to item', () => {
      const mockUnit = getMockTechTreeUnit();
      mockUnit.buildings = getMockTechTreeBuildings();
      mockUnit.tagIds = [];

      const buildingTagIds = mockUnit.buildings.map(
        (building) => getTagByName(building.itemName).id,
      );

      const taggedItem = addTagsToItem(mockUnit);

      buildingTagIds.forEach((id) => {
        expect(taggedItem.tagIds).toContain(id);
      });
    });
  });

  describe('filter by tag type', () => {
    test('should filter by units tag', () => {
      const mockItems = getMockTechTreeItems();
      const unitsTag = getTagByName('units');

      const filterResults = filterByTagType(
        mockItems,
        [unitsTag],
        TagType.KIND,
      );

      expect(filterResults.every((item) => isUnit(item))).toBe(true);
    });

    test('should filter by techs tag', () => {
      const mockItems = getMockTechTreeItems();
      const techsTag = getTagByName('techs');

      const filterResults = filterByTagType(
        mockItems,
        [techsTag],
        TagType.KIND,
      );

      expect(filterResults.every((item) => isTech(item))).toBe(true);
    });

    test('should filter by buildings tag', () => {
      const mockItems = getMockTechTreeItems();
      const buildingsTag = getTagByName('buildings');

      const filterResults = filterByTagType(
        mockItems,
        [buildingsTag],
        TagType.KIND,
      );

      expect(filterResults.every((item) => isBuilding(item))).toBe(true);
    });

    test('should filter by age tag', () => {
      const mockItems = getMockTechTreeItems();
      const mockDarkAgeItem = mockItems[0];
      mockDarkAgeItem.age!.ageName = 'dark age';
      mockDarkAgeItem.tagIds = [getTagByName('dark age').id];

      const mockFeudalAgeItem = mockItems[1];
      mockFeudalAgeItem.age!.ageName = 'feudal age';
      mockFeudalAgeItem.tagIds = [getTagByName('feudal age').id];

      const darkAgeTag = getTagByName('dark age');

      const filterResults = filterByTagType(
        [mockDarkAgeItem, mockFeudalAgeItem],
        [darkAgeTag],
        TagType.AGE,
      );

      expect(
        filterResults.every((item) => item.age!.ageName === 'dark age'),
      ).toBe(true);
    });

    test('should filter by a specific building tag', () => {
      const mockArcheryRangeItem = getMockTechTreeUnit();
      mockArcheryRangeItem.buildings = [
        { id: 1, itemName: 'archery range', kind: TechTreeItemType.BUILDING },
      ];
      mockArcheryRangeItem.tagIds = [getTagByName('archery range').id];

      const mockStableItem = getMockTechTreeUnit();
      mockStableItem.buildings = [
        { id: 2, itemName: 'stable', kind: TechTreeItemType.BUILDING },
      ];
      mockStableItem.tagIds = [getTagByName('stable').id];

      const archeryRangeTag = getTagByName('archery range');

      const filterResults = filterByTagType(
        [mockArcheryRangeItem, mockStableItem],
        [archeryRangeTag],
        TagType.BUILDING,
      );

      expect(
        filterResults.every((item) =>
          (item as IUnit).buildings.some(
            (building) => building.itemName === 'archery range',
          ),
        ),
      ).toBe(true);
    });

    test('should filter by a multiple tags', () => {
      const mockItems = getMockTechTreeItems();

      const unitsTag = getTagByName('units');
      const techsTag = getTagByName('techs');

      const filterResults = filterByTagType(
        mockItems,
        [unitsTag, techsTag],
        TagType.KIND,
      );

      expect(filterResults.every((item) => isUnit(item) || isTech(item))).toBe(
        true,
      );
    });

    test('should return all items if there are no selected tags', () => {
      const mockItems = getMockTechTreeItems();
      const filterResults = filterByTagType(mockItems, [], TagType.KIND);
      expect(filterResults.length).toBe(mockItems.length);
    });
  });

  describe('filter by uniques tag', () => {
    test('should include uniques if uniques tag is selected', () => {
      const mockItems = getMockTechTreeItems();

      const uniquesTag = getTagByName('uniques');

      const filterResults = filterByUnique(mockItems, [uniquesTag]);

      expect(filterResults.some((item) => item.isUnique)).toBe(true);
    });

    test('should filter out uniques if uniques tag is not selected', () => {
      const mockItems = getMockTechTreeItems();

      const filterResults = filterByUnique(mockItems, []);

      expect(filterResults.every((item) => !item.isUnique)).toBe(true);
    });
  });

  describe('doFilter', () => {
    test('should filter by multiple tag types', () => {
      const mockItems = getMockTechTreeItems();
      const unitsTag = getTagByName('units');
      const feudalAgeTag = getTagByName('feudal age');
      const archeryRangeTag = getTagByName('archery range');

      const filterResults = doFilter(mockItems, [
        unitsTag,
        feudalAgeTag,
        archeryRangeTag,
      ]);

      expect(
        filterResults.every(
          (item) =>
            isUnit(item) &&
            item.age.ageName === 'feudal age' &&
            item.buildings.some(
              (building) => building.itemName === 'archery range',
            ),
        ),
      ).toBe(true);
    });
  });
});
