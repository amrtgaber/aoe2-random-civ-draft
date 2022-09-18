import { ITechTreeItem } from '../../api/tech-tree-item-api';
import { getTagsByType, TagType, uniqueTagIds } from './tags';

const getEnabledTagIdsByType = (
  tagType: TagType,
  enabledTagIds: number[]
): number[] => {
  const tagsByType = getTagsByType(tagType);
  const enabledTags = tagsByType.filter((tag) =>
    enabledTagIds.includes(tag.id)
  );
  return enabledTags.map((tag) => tag.id);
};

export function filterByKind(
  items: ITechTreeItem[],
  allEnabledTagIds: number[]
): ITechTreeItem[] {
  const enabledKindTagIds = getEnabledTagIdsByType(
    TagType.KIND,
    allEnabledTagIds
  );

  return items.filter((item) =>
    item.tagIds!.some((tagId) => enabledKindTagIds.includes(tagId))
  );
}

export function filterByUnique(
  items: ITechTreeItem[],
  allEnabledTagIds: number[]
): ITechTreeItem[] {
  const enabledUniqueTagIds = getEnabledTagIdsByType(
    TagType.UNIQUE,
    allEnabledTagIds
  );

  if (enabledUniqueTagIds.length > 0) {
    return items;
  }

  return items.filter(
    (item) => !item.tagIds!.some((tagId) => uniqueTagIds.includes(tagId))
  );
}

export function filterByAge(
  items: ITechTreeItem[],
  allEnabledTagIds: number[]
): ITechTreeItem[] {
  const enabledAgeTagIds = getEnabledTagIdsByType(
    TagType.AGE,
    allEnabledTagIds
  );

  if (enabledAgeTagIds.length === 0) {
    return items;
  }

  return items.filter((item) =>
    item.tagIds!.some((tagId) => enabledAgeTagIds.includes(tagId))
  );
}

export function filterByBuilding(
  items: ITechTreeItem[],
  allEnabledTagIds: number[]
): ITechTreeItem[] {
  const enabledBuildingTagIds = getEnabledTagIdsByType(
    TagType.BUILDING,
    allEnabledTagIds
  );

  if (enabledBuildingTagIds.length === 0) {
    return items;
  }

  return items.filter((item) =>
    item.tagIds!.some((tagId) => enabledBuildingTagIds.includes(tagId))
  );
}