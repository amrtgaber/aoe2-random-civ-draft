import { doFilter } from './TagsService';
import { doSearch } from './SearchService';
import { doSort } from './SortService';
import { ITechTreeItem } from '../../../api/tech-tree-item-api';
import { TechTreeFilterState } from '..';

export function assembleShownItemsOnChange(
  state: TechTreeFilterState
): ITechTreeItem[] {
  const { searchTerm, selectedTagIds, sortMode, taggedItems } = state;

  let newShownItems = doFilter(taggedItems, selectedTagIds);
  newShownItems = doSearch(newShownItems, searchTerm);
  newShownItems = doSort(newShownItems, sortMode);

  return newShownItems;
}
