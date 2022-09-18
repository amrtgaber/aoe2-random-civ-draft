import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectTechTreeFilter,
  setShownItems,
} from '../../store/tech-tree-filter-slice';

import './tech-tree-filter-search.scss';

export const TechTreeFilterSearch: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { shownItems } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    doSearch();
  }, [searchTerm]);

  const doSearch = () => {
    const searchedItems = shownItems.filter((item) => {
      return item.itemName.includes(searchTerm.toLowerCase());
    });

    dispatch(setShownItems(searchedItems));
  };

  return (
    <div className='tech-tree-filter-search'>
      <input
        type='text'
        className='search-input'
        placeholder='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <span className='clear-search' onClick={() => setSearchTerm('')}>
        ✖
      </span>
    </div>
  );
};
