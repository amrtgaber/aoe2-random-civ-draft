import { ITechTreeItem } from '../../../api/tech-tree-item-api';

export function doSearch(
  items: ITechTreeItem[],
  searchTerm: string
): ITechTreeItem[] {
  const searchedItems = items.filter((item) => {
    return item.itemName.includes(searchTerm.toLowerCase());
  });

  return searchedItems;
}
