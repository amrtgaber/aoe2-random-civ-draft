import {
  filterByAge,
  filterByBuilding,
  filterByKind,
  filterByUnique,
} from './filters';

import { ITechTreeItem } from '../../../../api/tech-tree-item-api';

export function doFilter(items: ITechTreeItem[], selectedTagIds: number[]) {
  let filteredItems = items;

  filteredItems = filterByKind(filteredItems, selectedTagIds);
  filteredItems = filterByUnique(filteredItems, selectedTagIds);
  filteredItems = filterByAge(filteredItems, selectedTagIds);
  filteredItems = filterByBuilding(filteredItems, selectedTagIds);

  return filteredItems;
}
