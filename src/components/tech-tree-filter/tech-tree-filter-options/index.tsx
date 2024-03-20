import { ChangeEvent, FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  clearItemsFilter,
  FilterMode,
  selectTechTreeFilter,
  setFilterMode,
  setSortMode,
} from '../../../store/slices/tech-tree-filter-slice';
import { SortBy } from '../../../store/slices/tech-tree-filter-slice/tech-tree-filter-service/sort-service';

import './tech-tree-filter-options.scss';

export const TechTreeFilterOptions: FC = () => {
  const { filterMode, sortMode } = useAppSelector(selectTechTreeFilter);
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
    dispatch(clearItemsFilter());
  };

  const handleChangeSortMode = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortMode(e.target.value as SortBy));
  };

  return (
    <div className='tech-tree-filter-options'>
      <div className='tech-tree-filter-reset'>
        <a className='clear-filter-button' onClick={handleClearFilter}>
          Clear selections
        </a>
      </div>

      <div className='tech-tree-filter-mode'>
        Civ has{' '}
        <a className='filter-mode-button' onClick={handleToggleFilterMode}>
          {filterMode}
        </a>{' '}
        selected items
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
          <option value={SortBy.KIND}>by type</option>
        </select>
      </div>
    </div>
  );
};
