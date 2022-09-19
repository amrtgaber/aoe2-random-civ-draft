import { doFilter } from './tags-service';
import { doSearch } from './search-service';
import { doSort } from './sort-service';
import { ITechTreeItem } from '../../../api/tech-tree-item-api';
import { TechTreeFilterState } from '..';

export function assembleShownItemsOnChange(
  state: TechTreeFilterState
): ITechTreeItem[] {
  const { searchTerm, selectedTags, sortMode, taggedItems } = state;

  let newShownItems = doFilter(taggedItems, selectedTags);
  newShownItems = doSearch(newShownItems, searchTerm);
  newShownItems = doSort(newShownItems, sortMode);

  return newShownItems;
}
