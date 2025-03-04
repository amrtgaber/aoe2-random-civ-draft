import {
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../../../../api/tech-tree-item-api';

import { FilterTag, filterTags, TagType } from './tags';

export const tagsMap = new Map<string, FilterTag>(
  filterTags.map((tag) => [tag.tagName, tag]),
);

export function getTagByName(name: string): FilterTag {
  const tag = tagsMap.get(name);

  if (!tag) {
    throw new Error(`tag name ${name} not found`);
  }

  return tag;
}

export function addTagsToItem(item: ITechTreeItem): ITechTreeItem {
  const tagIds = [];

  if (isUnit(item)) {
    tagIds.push(getTagByName('units').id);
  } else if (isTech(item)) {
    tagIds.push(getTagByName('techs').id);
  } else {
    tagIds.push(getTagByName('buildings').id);
  }

  if (item.isUnique) {
    tagIds.push(getTagByName('uniques').id);
  }

  tagIds.push(getTagByName(item.age!.ageName).id);

  if (isUnit(item) || isTech(item)) {
    item.buildings.forEach((building) => {
      tagIds.push(getTagByName(building.itemName).id);
    });
  }

  return {
    ...item,
    tagIds,
  };
}

export function doFilter(items: ITechTreeItem[], selectedTags: FilterTag[]) {
  let filteredItems = items;

  filteredItems = filterByTagType(filteredItems, selectedTags, TagType.KIND);
  filteredItems = filterByTagType(filteredItems, selectedTags, TagType.AGE);
  filteredItems = filterByTagType(
    filteredItems,
    selectedTags,
    TagType.BUILDING,
  );
  filteredItems = filterByUnique(filteredItems, selectedTags);

  return filteredItems;
}

export function filterByTagType(
  items: ITechTreeItem[],
  allSelectedTags: FilterTag[],
  tagType: TagType,
): ITechTreeItem[] {
  const selectedTypeTagIds = allSelectedTags
    .filter((tag) => tag.tagType === tagType)
    .map((tag) => tag.id);

  if (selectedTypeTagIds.length === 0) {
    return items;
  }

  return items.filter((item) =>
    item.tagIds!.some((tagId) => selectedTypeTagIds.includes(tagId)),
  );
}

export function filterByUnique(
  items: ITechTreeItem[],
  allSelectedTags: FilterTag[],
): ITechTreeItem[] {
  const isUniquesTagSelected = allSelectedTags.some(
    (selectedTag) => selectedTag.tagType === TagType.UNIQUE,
  );

  if (isUniquesTagSelected) {
    return items;
  }

  return items.filter((item) => !item.isUnique);
}
