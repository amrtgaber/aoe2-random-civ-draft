import {
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../../../../api/tech-tree-item-api';
import { FilterTag, filterTags, TagType } from './tags';

export const tagsMap = new Map<string, number>(
  filterTags.map((tag) => [tag.tagName, tag.id])
);

export function addTagsToItem(item: ITechTreeItem): ITechTreeItem {
  const tagIds = [];

  if (isUnit(item)) {
    tagIds.push(tagsMap.get('units')!);
  } else if (isTech(item)) {
    tagIds.push(tagsMap.get('techs')!);
  } else {
    tagIds.push(tagsMap.get('buildings')!);
  }

  if (item.isUnique) {
    tagIds.push(tagsMap.get('uniques')!);
  }

  tagIds.push(tagsMap.get(item.age!.ageName)!);

  if (isUnit(item) || isTech(item)) {
    item.buildings.forEach((building) => {
      tagIds.push(tagsMap.get(building.itemName)!);
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
    TagType.BUILDING
  );
  filteredItems = filterByUnique(filteredItems, selectedTags);

  return filteredItems;
}

export function filterByTagType(
  items: ITechTreeItem[],
  allSelectedTags: FilterTag[],
  tagType: TagType
): ITechTreeItem[] {
  const selectedTypeTagIds = allSelectedTags
    .filter((tag) => tag.tagType === tagType)
    .map((tag) => tag.id);

  if (selectedTypeTagIds.length === 0) {
    return items;
  }

  return items.filter((item) =>
    item.tagIds!.some((tagId) => selectedTypeTagIds.includes(tagId))
  );
}

export function filterByUnique(
  items: ITechTreeItem[],
  allSelectedTags: FilterTag[]
): ITechTreeItem[] {
  const isUniquesTagSelected = allSelectedTags.some(
    (selectedTag) => selectedTag.tagType === TagType.UNIQUE
  );

  if (isUniquesTagSelected) {
    return items;
  }

  return items.filter((item) => !item.isUnique);
}
