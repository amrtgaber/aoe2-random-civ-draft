import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  isBuilding,
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../api/tech-tree-item-api';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  clearFilter,
  FilterMode,
  selectTechTreeFilter,
  setFilterMode,
  setShownItems,
} from '../../store/tech-tree-filter-slice';

import './tech-tree-filter-options.scss';

enum SortBy {
  ALPHA = 'SORT_BY_ALPHA',
  AGE = 'SORT_BY_AGE',
  BUILDING = 'SORT_BY_BUILDING',
}

export const TechTreeFilterOptions: FC = () => {
  const [sortMode, setSortMode] = useState(SortBy.ALPHA);

  const { filterMode, shownItems } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

  const handleToggleFilterMode = () => {
    dispatch(
      setFilterMode(
        filterMode === FilterMode.HAS_ALL
          ? FilterMode.HAS_ANY
          : FilterMode.HAS_ALL
      )
    );
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  const handleChangeSortMode = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortMode(e.target.value as SortBy);
  };

  useEffect(() => {
    doSort();
  }, [sortMode]);

  const sortByAlpha = (items: ITechTreeItem[]) => {
    return items.sort((item1, item2) => {
      return item1.itemName > item2.itemName ? 1 : -1;
    });
  };

  const sortByAge = (items: ITechTreeItem[]) => {
    return items.sort((item1, item2) => item1.age!.id - item2.age!.id);
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
    return items.sort((item1, item2) => {
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

  const doSort = () => {
    // const sortFunction = sortFunctions[sortMode];
    // sortFunction(shownItems);

    let sortedItems = [...shownItems];
    const sortFunction = sortFunctions[sortMode];
    sortedItems = sortFunction(sortedItems);
    dispatch(setShownItems(sortedItems));
  };

  return (
    <div className='tech-tree-filter-options'>
      <div className='options-title'>Options</div>

      <div className='tech-tree-filter-mode'>
        Civ has{' '}
        <a className='filter-mode-button' onClick={handleToggleFilterMode}>
          {filterMode}
        </a>{' '}
        selected items
      </div>

      <div className='tech-tree-filter-clear-filter'>
        <a className='clear-filter-button' onClick={handleClearFilter}>
          Clear selected items
        </a>
      </div>

      <div className='tech-tree-filter-sort'>
        <div className='sort-text'>sort</div>
        <select
          value={sortMode}
          onChange={handleChangeSortMode}
          className='sort-dropdown'
        >
          <option value={SortBy.ALPHA}>a-z</option>
          <option value={SortBy.AGE}>by age</option>
          <option value={SortBy.BUILDING}>by building</option>
        </select>
      </div>
    </div>
  );
};
