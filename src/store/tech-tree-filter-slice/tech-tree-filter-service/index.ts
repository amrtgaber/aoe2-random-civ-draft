import { doFilter } from './tags-service';
import { doSearch } from './search-service';
import { doSort } from './sort-service';
import { ITechTreeItem } from '../../../api/tech-tree-item-api';
import { TechTreeFilterState } from '..';

export function assembleShownItemsOnChange(
  state: TechTreeFilterState
): ITechTreeItem[] {
  const { itemsFilter, searchTerm, selectedTags, sortMode, taggedItems } =
    state;

  const selectedItemIds = itemsFilter.map((item) => item.id);
  let newShownItems = taggedItems.filter(
    (taggedItem) => !selectedItemIds.includes(taggedItem.id)
  );

  newShownItems = doFilter(newShownItems, selectedTags);
  newShownItems = doSearch(newShownItems, searchTerm);
  newShownItems = doSort(newShownItems, sortMode);

  return newShownItems;
}
