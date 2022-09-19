import {
  isBuilding,
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../../api/tech-tree-item-api';

export enum SortBy {
  ALPHA = 'SORT_BY_ALPHA',
  AGE = 'SORT_BY_AGE',
  BUILDING = 'SORT_BY_BUILDING',
}

const sortByAlpha = (items: ITechTreeItem[]) => {
  items.sort((item1, item2) => {
    return item1.itemName > item2.itemName ? 1 : -1;
  });
};

const sortByAge = (items: ITechTreeItem[]) => {
  items.sort((item1, item2) => item1.age!.id - item2.age!.id);
};

const getBuildingId = (item: ITechTreeItem) => {
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
    const id1: number = getBuildingId(item1);
    const id2: number = getBuildingId(item2);

    return id1 - id2;
  });
};

const sortFunctions = {
  [SortBy.ALPHA]: sortByAlpha,
  [SortBy.AGE]: sortByAge,
  [SortBy.BUILDING]: sortByBuilding,
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
