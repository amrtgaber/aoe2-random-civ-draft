import { FC, useEffect, useState } from 'react';
import { FilterTag } from '../../api/tech-tree-item-api';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectTechTreeFilter,
  setShownItems,
} from '../../store/tech-tree-filter-slice';
import { filterTags } from './tags';

import './tech-tree-filter-tags.scss';

export const TechTreeFilterTags: FC = () => {
  const { shownItems } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

  const handleToggleFilterTag = (tag: FilterTag) => {
    if (tag.isOn) {
      // TODO
    } else {
      tag.isOn = true;
      const itemsWithTag = shownItems.filter((item) =>
        item.tags!.some((itemTag) => itemTag.id === tag.id)
      );
    }
  };

  return (
    <div className='tech-tree-filter-tags'>
      <div className='tags-title'>Filter items</div>
      <div className='tags-buttons'>
        {Object.values(filterTags).map((tag) => (
          <a
            key={tag.id}
            className={`tags-button ${tag.isOn ? `tag-on` : ''}`}
            onClick={() => handleToggleFilterTag(tag)}
          >
            {tag.tagName}
          </a>
        ))}
      </div>
    </div>
  );
};
