import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectTechTreeFilter,
  setShownItems,
} from '../../store/tech-tree-filter-slice';
import {
  filterByAge,
  filterByBuilding,
  filterByKind,
  filterByUnique,
} from './filters';
import { FilterTag, filterTags, getTagIdsByType, TagType } from './tags';

import './tech-tree-filter-tags.scss';

export const TechTreeFilterTags: FC = () => {
  const [enabledTagIds, setEnabledTagIds] = useState<number[]>(
    getTagIdsByType(TagType.KIND)
  );

  const { taggedItems } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

  const handleResetTags = () => {
    setEnabledTagIds(getTagIdsByType(TagType.KIND));
  };

  const handleToggleFilterTag = (tag: FilterTag, isOn: boolean) => {
    if (isOn) {
      const tagIds = enabledTagIds.filter((id) => id !== tag.id);
      setEnabledTagIds(tagIds);
    } else {
      setEnabledTagIds([...enabledTagIds, tag.id]);
    }
  };

  useEffect(() => {
    doFilter();
  }, [enabledTagIds]);

  const doFilter = () => {
    let filteredItems = taggedItems;

    filteredItems = filterByKind(filteredItems, enabledTagIds);
    filteredItems = filterByUnique(filteredItems, enabledTagIds);
    filteredItems = filterByAge(filteredItems, enabledTagIds);
    filteredItems = filterByBuilding(filteredItems, enabledTagIds);

    dispatch(setShownItems(filteredItems));
  };

  const renderTagsByType = (tagType: TagType): JSX.Element[] => {
    return filterTags
      .filter((tag) => tag.tagType === tagType)
      .map((tag) => {
        const isOn = enabledTagIds.includes(tag.id);

        return (
          <a
            key={tag.id}
            className={`tags-button ${isOn ? `tag-on` : ''}`}
            onClick={() => handleToggleFilterTag(tag, isOn)}
          >
            {tag.tagName}
          </a>
        );
      });
  };

  return (
    <div className='tech-tree-filter-tags'>
      <div className='tags-top-bar'>
        <div className='tags-title'>Filter items</div>
        <a className='tags-reset-button' onClick={handleResetTags}>
          Reset
        </a>
      </div>
      <div className='tags-type-title'>By Type</div>
      <div className='tags-buttons'>{renderTagsByType(TagType.KIND)}</div>
      <div className='tags-type-title'>By Unique</div>
      <div className='tags-buttons'>{renderTagsByType(TagType.UNIQUE)}</div>
      <div className='tags-type-title'>By Age</div>
      <div className='tags-buttons age-tags'>
        {renderTagsByType(TagType.AGE)}
      </div>
      <div className='tags-type-title'>By Building</div>
      <div className='tags-buttons'>{renderTagsByType(TagType.BUILDING)}</div>
    </div>
  );
};
