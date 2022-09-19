export enum TagType {
  KIND,
  UNIQUE,
  AGE,
  BUILDING,
}

export interface FilterTag {
  id: number;
  tagName: string;
  tagType: TagType;
}

export const filterTags: FilterTag[] = [
  {
    id: 0,
    tagName: 'units',
    tagType: TagType.KIND,
  },
  {
    id: 1,
    tagName: 'techs',
    tagType: TagType.KIND,
  },
  {
    id: 2,
    tagName: 'buildings',
    tagType: TagType.KIND,
  },
  {
    id: 3,
    tagName: 'uniques',
    tagType: TagType.UNIQUE,
  },
  {
    id: 4,
    tagName: 'dark age',
    tagType: TagType.AGE,
  },
  {
    id: 5,
    tagName: 'feudal age',
    tagType: TagType.AGE,
  },
  {
    id: 6,
    tagName: 'castle age',
    tagType: TagType.AGE,
  },
  {
    id: 7,
    tagName: 'imperial age',
    tagType: TagType.AGE,
  },
  {
    id: 8,
    tagName: 'archery range',
    tagType: TagType.BUILDING,
  },
  {
    id: 9,
    tagName: 'barracks',
    tagType: TagType.BUILDING,
  },
  {
    id: 10,
    tagName: 'blacksmith',
    tagType: TagType.BUILDING,
  },
  {
    id: 11,
    tagName: 'castle',
    tagType: TagType.BUILDING,
  },
  {
    id: 12,
    tagName: 'dock',
    tagType: TagType.BUILDING,
  },
  {
    id: 13,
    tagName: 'donjon',
    tagType: TagType.BUILDING,
  },
  {
    id: 14,
    tagName: 'folwark',
    tagType: TagType.BUILDING,
  },
  {
    id: 15,
    tagName: 'harbor',
    tagType: TagType.BUILDING,
  },
  {
    id: 16,
    tagName: 'krepost',
    tagType: TagType.BUILDING,
  },
  {
    id: 17,
    tagName: 'lumber camp',
    tagType: TagType.BUILDING,
  },
  {
    id: 18,
    tagName: 'market',
    tagType: TagType.BUILDING,
  },
  {
    id: 19,
    tagName: 'mill',
    tagType: TagType.BUILDING,
  },
  {
    id: 20,
    tagName: 'mining camp',
    tagType: TagType.BUILDING,
  },
  {
    id: 21,
    tagName: 'monastery',
    tagType: TagType.BUILDING,
  },
  {
    id: 22,
    tagName: 'siege workshop',
    tagType: TagType.BUILDING,
  },
  {
    id: 23,
    tagName: 'stable',
    tagType: TagType.BUILDING,
  },
  {
    id: 24,
    tagName: 'town center',
    tagType: TagType.BUILDING,
  },
  {
    id: 25,
    tagName: 'university',
    tagType: TagType.BUILDING,
  },
];
