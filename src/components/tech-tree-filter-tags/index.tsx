import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectTechTreeFilter,
  setSelectedTagIds,
} from '../../store/tech-tree-filter-slice';
import {
  FilterTag,
  filterTags,
  getTagIdsByType,
  TagType,
} from '../../store/tech-tree-filter-slice/TechTreeFilterService/TagsService/tags';

import './tech-tree-filter-tags.scss';

export const TechTreeFilterTags: FC = () => {
  const { selectedTagIds } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

  const handleResetTags = () => {
    dispatch(setSelectedTagIds(getTagIdsByType(TagType.KIND)));
  };

  const handleToggleFilterTag = (tag: FilterTag, isOn: boolean) => {
    if (isOn) {
      const tagIds = selectedTagIds.filter((id) => id !== tag.id);
      dispatch(setSelectedTagIds(tagIds));
    } else {
      dispatch(setSelectedTagIds([...selectedTagIds, tag.id]));
    }
  };

  const renderTagsByType = (tagType: TagType): JSX.Element[] => {
    return filterTags
      .filter((tag) => tag.tagType === tagType)
      .map((tag) => {
        const isOn = selectedTagIds.includes(tag.id);

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
