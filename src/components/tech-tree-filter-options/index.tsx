import { ChangeEvent, FC, useEffect, useState } from 'react';
import { isBuilding, isTech, isUnit } from '../../api/tech-tree-item-api';

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

  const doSort = () => {
    const sortedItems = [...shownItems];

    if (sortMode === SortBy.ALPHA) {
      sortedItems.sort((item1, item2) =>
        item1.itemName > item2.itemName ? 1 : -1
      );
    }

    if (sortMode === SortBy.AGE) {
      sortedItems.sort((item1, item2) => item1.age!.id - item2.age!.id);
    }

    if (sortMode === SortBy.BUILDING) {
      sortedItems.sort((item1, item2) => {
        let id1 = 0;
        let id2 = 0;

        if (isBuilding(item1)) {
          id1 = item1.id;
        } else if (isUnit(item1) || isTech(item1)) {
          id1 = item1.buildings[0].id;
        }

        if (isBuilding(item2)) {
          id2 = item2.id;
        } else if (isUnit(item2) || isTech(item2)) {
          id2 = item2.buildings[0].id;
        }

        return id1 - id2;
      });
    }

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
