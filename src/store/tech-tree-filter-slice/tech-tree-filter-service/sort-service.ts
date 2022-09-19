import {
  isBuilding,
  isTech,
  isUnit,
  ITechTreeItem,
  TechTreeItemType,
} from '../../../api/tech-tree-item-api';

export enum SortBy {
  ALPHA = 'SORT_BY_ALPHA',
  AGE = 'SORT_BY_AGE',
  BUILDING = 'SORT_BY_BUILDING',
  KIND = 'SORT_BY_KIND',
}

const sortByAlpha = (items: ITechTreeItem[]) => {
  items.sort((item1, item2) => item1.itemName.localeCompare(item2.itemName));
};

const sortByAge = (items: ITechTreeItem[]) => {
  items.sort((item1, item2) => item1.age!.id - item2.age!.id);
};

const getBuildingId = (item: ITechTreeItem): number => {
  let itemId = 0;

  if (isBuilding(item)) {
    itemId = item.id;
  } else if (isUnit(item) || isTech(item)) {
    itemId = item.buildings[0].id;
  }

  return itemId;
};

const sortByBuilding = (items: ITechTreeItem[]) => {
  items.sort((item1, item2) => {
    const id1 = getBuildingId(item1);
    const id2 = getBuildingId(item2);

    return id1 - id2;
  });
};

const sortByKind = (items: ITechTreeItem[]) => {
  items.sort((item1, item2) => {
    const kindMap = {
      [TechTreeItemType.UNIT]: 1,
      [TechTreeItemType.TECH]: 2,
      [TechTreeItemType.BUILDING]: 3,
    };

    return kindMap[item1.kind] - kindMap[item2.kind];
  });
};

const sortFunctions = {
  [SortBy.ALPHA]: sortByAlpha,
  [SortBy.AGE]: sortByAge,
  [SortBy.BUILDING]: sortByBuilding,
  [SortBy.KIND]: sortByKind,
};

export const doSort = (
  items: ITechTreeItem[],
  sortMode: SortBy
): ITechTreeItem[] => {
  const sortedItems = [...items];
  const sortFunction = sortFunctions[sortMode];
  sortFunction(sortedItems);
  return sortedItems;
};
