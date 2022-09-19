import { ITechTreeItem } from '../../api/tech-tree-item-api';
import { getTagIdsByType, TagType } from './tags';

const getEnabledTagIdsByType = (
  tagType: TagType,
  enabledTagIds: number[]
): number[] => {
  const tagsIds = getTagIdsByType(tagType);
  const enabledTags = tagsIds.filter((id) => enabledTagIds.includes(id));
  return enabledTags;
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
    (item) =>
      !item.tagIds!.some((tagId) =>
        getTagIdsByType(TagType.UNIQUE).includes(tagId)
      )
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
