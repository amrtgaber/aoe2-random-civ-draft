import {
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../../../api/tech-tree-item-api';
import { FilterTag, filterTags, TagType } from './tags';

export function addTagsToItem(item: ITechTreeItem): ITechTreeItem {
  const tagMap = new Map<string, number>(
    filterTags.map((tag) => [tag.tagName, tag.id])
  );

  const tagIds = [];

  if (isUnit(item)) {
    tagIds.push(tagMap.get('units')!);
  } else if (isTech(item)) {
    tagIds.push(tagMap.get('techs')!);
  } else {
    tagIds.push(tagMap.get('buildings')!);
  }

  if (item.isUnique) {
    tagIds.push(tagMap.get('uniques')!);
  }

  tagIds.push(tagMap.get(item.age!.ageName)!);

  if (isUnit(item) || isTech(item)) {
    item.buildings.forEach((building) => {
      tagIds.push(tagMap.get(building.itemName)!);
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
