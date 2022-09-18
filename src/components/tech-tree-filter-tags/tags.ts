import {
  FilterTag,
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../api/tech-tree-item-api';

export function addTags(item: ITechTreeItem): ITechTreeItem {
  const tags = [];

  if (isUnit(item)) {
    tags.push(TAGS['units']);
  } else if (isTech(item)) {
    tags.push(TAGS['techs']);
  } else {
    tags.push(TAGS['buildings']);
  }

  if (item.isUnique) {
    tags.push(TAGS['uniques']);
  }

  tags.push();

  if (isUnit(item) || isTech(item)) {
    item.buildings.forEach((building) => {
      tags.push(TAGS[building.itemName]);
    });
  }

  return {
    ...item,
    tags,
  };
}

export const TAGS: { [key: string]: FilterTag } = {
  ['units']: {
    id: 0,
    tagName: 'units',
    isOn: false,
  },
  ['techs']: {
    id: 1,
    tagName: 'techs',
    isOn: false,
  },
  ['buildings']: {
    id: 2,
    tagName: 'buildings',
    isOn: false,
  },
  ['uniques']: {
    id: 3,
    tagName: 'uniques',
    isOn: false,
  },
  ['dark age']: {
    id: 4,
    tagName: 'dark age',
    isOn: false,
  },
  ['feudal age']: {
    id: 5,
    tagName: 'feudal age',
    isOn: false,
  },
  ['castle age']: {
    id: 6,
    tagName: 'castle age',
    isOn: false,
  },
  ['imperial age']: {
    id: 7,
    tagName: 'imperial age',
    isOn: false,
  },
  ['archery range']: {
    id: 8,
    tagName: 'archery range',
    isOn: false,
  },
  ['barracks']: {
    id: 9,
    tagName: 'barracks',
    isOn: false,
  },
  ['blacksmith']: {
    id: 10,
    tagName: 'blacksmith',
    isOn: false,
  },
  ['castle']: {
    id: 11,
    tagName: 'castle',
    isOn: false,
  },
  ['dock']: {
    id: 12,
    tagName: 'dock',
    isOn: false,
  },
  ['donjon']: {
    id: 13,
    tagName: 'donjon',
    isOn: false,
  },
  ['folwark']: {
    id: 14,
    tagName: 'folwark',
    isOn: false,
  },
  ['harbor']: {
    id: 15,
    tagName: 'harbor',
    isOn: false,
  },
  ['krepost']: {
    id: 16,
    tagName: 'krepost',
    isOn: false,
  },
  ['lumber camp']: {
    id: 17,
    tagName: 'lumber camp',
    isOn: false,
  },
  ['market']: {
    id: 18,
    tagName: 'market',
    isOn: false,
  },
  ['mill']: {
    id: 19,
    tagName: 'mill',
    isOn: false,
  },
  ['mining camp']: {
    id: 20,
    tagName: 'mining camp',
    isOn: false,
  },
  ['monastery']: {
    id: 21,
    tagName: 'monastery',
    isOn: false,
  },
  ['siege workshop']: {
    id: 22,
    tagName: 'siege workshop',
    isOn: false,
  },
  ['stable']: {
    id: 23,
    tagName: 'stable',
    isOn: false,
  },
  ['town center']: {
    id: 24,
    tagName: 'town center',
    isOn: false,
  },
  ['university']: {
    id: 25,
    tagName: 'university',
    isOn: false,
  },
};
