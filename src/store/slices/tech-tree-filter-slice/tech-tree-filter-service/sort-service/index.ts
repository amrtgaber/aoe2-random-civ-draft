import {
  isBuilding,
  isTech,
  isUnit,
  ITechTreeItem,
  TechTreeItemType,
} from '../../../../../api/tech-tree-item-api';

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
  if (isUnit(item) || isTech(item)) {
    return item.buildings[0].id;
  }

  return 0;
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
  sortMode: SortBy,
): ITechTreeItem[] => {
  let sortedItems = [...items];
  const sortFunction = sortFunctions[sortMode];
  sortFunction(sortedItems);

  if (sortMode === SortBy.BUILDING) {
    sortedItems = sortedItems.filter((item) => !isBuilding(item));
  }

  return sortedItems;
};
