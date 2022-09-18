import {
  FilterTag,
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../api/tech-tree-item-api';

export function getTagId(name: string): number | undefined {
  const matchedTag = TAGS.find((tag) => tag.tagName === name);
  return matchedTag?.id;
}

export function addTagsToItem(item: ITechTreeItem): ITechTreeItem {
  const tagIds = [];

  if (isUnit(item)) {
    tagIds.push(getTagId('units')!);
  } else if (isTech(item)) {
    tagIds.push(getTagId('techs')!);
  } else {
    tagIds.push(getTagId('buildings')!);
  }

  if (item.isUnique) {
    tagIds.push(getTagId('uniques')!);
  }

  tagIds.push(getTagId(item.age!.ageName)!);

  if (isUnit(item) || isTech(item)) {
    item.buildings.forEach((building) => {
      tagIds.push(getTagId(building.itemName)!);
    });
  }

  return {
    ...item,
    tagIds,
  };
}

export const TAGS: FilterTag[] = [
  {
    id: 0,
    tagName: 'units',
  },
  {
    id: 1,
    tagName: 'techs',
  },
  {
    id: 2,
    tagName: 'buildings',
  },
  {
    id: 3,
    tagName: 'uniques',
  },
  {
    id: 4,
    tagName: 'dark age',
  },
  {
    id: 5,
    tagName: 'feudal age',
  },
  {
    id: 6,
    tagName: 'castle age',
  },
  {
    id: 7,
    tagName: 'imperial age',
  },
  {
    id: 8,
    tagName: 'archery range',
  },
  {
    id: 9,
    tagName: 'barracks',
  },
  {
    id: 10,
    tagName: 'blacksmith',
  },
  {
    id: 11,
    tagName: 'castle',
  },
  {
    id: 12,
    tagName: 'dock',
  },
  {
    id: 13,
    tagName: 'donjon',
  },
  {
    id: 14,
    tagName: 'folwark',
  },
  {
    id: 15,
    tagName: 'harbor',
  },
  {
    id: 16,
    tagName: 'krepost',
  },
  {
    id: 17,
    tagName: 'lumber camp',
  },
  {
    id: 18,
    tagName: 'market',
  },
  {
    id: 19,
    tagName: 'mill',
  },
  {
    id: 20,
    tagName: 'mining camp',
  },
  {
    id: 21,
    tagName: 'monastery',
  },
  {
    id: 22,
    tagName: 'siege workshop',
  },
  {
    id: 23,
    tagName: 'stable',
  },
  {
    id: 24,
    tagName: 'town center',
  },
  {
    id: 25,
    tagName: 'university',
  },
];
