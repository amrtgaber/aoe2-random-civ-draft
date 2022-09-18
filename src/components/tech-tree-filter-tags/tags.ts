import {
  FilterTag,
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../api/tech-tree-item-api';

export const filterTags = new Map<string, FilterTag>();

export function addTags(item: ITechTreeItem): ITechTreeItem {
  const tags = [];

  if (isUnit(item)) {
    tags.push(filterTags.get('units'));
  } else if (isTech(item)) {
    tags.push(filterTags.get('techs'));
  } else {
    tags.push(filterTags.get('buildings'));
  }

  if (item.isUnique) {
    tags.push(filterTags.get('uniques'));
  }

  tags.push();

  if (isUnit(item) || isTech(item)) {
    item.buildings.forEach((building) => {
      tags.push(filterTags.get(building.itemName));
    });
  }

  return {
    ...item,
    tags,
  };
}

function initTagMap() {
  TAGS.forEach((tag) => {
    filterTags.set(tag.tagName, tag);
  });
}

initTagMap();

export const TAGS: FilterTag[] = [
  {
    id: 0,
    tagName: 'units',
    isOn: false,
  },
  {
    id: 1,
    tagName: 'techs',
    isOn: false,
  },
  {
    id: 2,
    tagName: 'buildings',
    isOn: false,
  },
  {
    id: 3,
    tagName: 'uniques',
    isOn: false,
  },
  {
    id: 4,
    tagName: 'dark age',
    isOn: false,
  },
  {
    id: 5,
    tagName: 'feudal age',
    isOn: false,
  },
  {
    id: 6,
    tagName: 'castle age',
    isOn: false,
  },
  {
    id: 7,
    tagName: 'imperial age',
    isOn: false,
  },
  {
    id: 8,
    tagName: 'archery range',
    isOn: false,
  },
  {
    id: 9,
    tagName: 'barracks',
    isOn: false,
  },
  {
    id: 10,
    tagName: 'blacksmith',
    isOn: false,
  },
  {
    id: 11,
    tagName: 'castle',
    isOn: false,
  },
  {
    id: 12,
    tagName: 'dock',
    isOn: false,
  },
  {
    id: 13,
    tagName: 'donjon',
    isOn: false,
  },
  {
    id: 14,
    tagName: 'folwark',
    isOn: false,
  },
  {
    id: 15,
    tagName: 'harbor',
    isOn: false,
  },
  {
    id: 16,
    tagName: 'krepost',
    isOn: false,
  },
  {
    id: 17,
    tagName: 'lumber camp',
    isOn: false,
  },
  {
    id: 18,
    tagName: 'market',
    isOn: false,
  },
  {
    id: 19,
    tagName: 'mill',
    isOn: false,
  },
  {
    id: 20,
    tagName: 'mining camp',
    isOn: false,
  },
  {
    id: 21,
    tagName: 'monastery',
    isOn: false,
  },
  {
    id: 22,
    tagName: 'siege workshop',
    isOn: false,
  },
  {
    id: 23,
    tagName: 'stable',
    isOn: false,
  },
  {
    id: 24,
    tagName: 'town center',
    isOn: false,
  },
  {
    id: 25,
    tagName: 'university',
    isOn: false,
  },
];
