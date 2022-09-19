import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectTechTreeFilter,
  setSearchTerm,
} from '../../store/tech-tree-filter-slice';

import './tech-tree-filter-search.scss';

export const TechTreeFilterSearch: FC = () => {
  const { searchTerm } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

  return (
    <div className='tech-tree-filter-search'>
      <input
        type='text'
        className='search-input'
        placeholder='search'
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <span
        className='clear-search'
        onClick={() => dispatch(setSearchTerm(''))}
      >
        ✖
      </span>
    </div>
  );
};
