import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectTechTreeFilter,
  setSelectedTags,
} from '../../store/tech-tree-filter-slice';
import {
  FilterTag,
  filterTags,
} from '../../store/tech-tree-filter-slice/tech-tree-filter-service/tags-service/tags';
import { TagType } from '../../store/tech-tree-filter-slice/tech-tree-filter-service/tags-service/tags';

import './tech-tree-filter-tags.scss';

export const TechTreeFilterTags: FC = () => {
  const { selectedTags } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

  const handleResetTags = () => {
    dispatch(setSelectedTags([]));
  };

  const handleToggleFilterTag = (newTag: FilterTag, isOn: boolean) => {
    if (isOn) {
      const tags = selectedTags.filter((tag) => tag.id !== newTag.id);
      dispatch(setSelectedTags(tags));
    } else {
      dispatch(setSelectedTags([...selectedTags, newTag]));
    }
  };

  const renderTagsByType = (tagType: TagType): JSX.Element[] => {
    return filterTags
      .filter((tag) => tag.tagType === tagType)
      .map((tag) => {
        const selectedTagIds = selectedTags.map((tag) => tag.id);
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
          clear filters
        </a>
      </div>
      <div className='tags-type-title'>By Type</div>
      <div className='tags-buttons kind-tags'>
        {renderTagsByType(TagType.KIND)}
      </div>
      <div className='tags-type-title'>Include Uniques</div>
      <div className='tags-buttons unique-tags'>
        {renderTagsByType(TagType.UNIQUE)}
      </div>
      <div className='tags-type-title'>By Age</div>
      <div className='tags-buttons'>{renderTagsByType(TagType.AGE)}</div>
      <div className='tags-type-title'>By Building</div>
      <div className='tags-buttons'>{renderTagsByType(TagType.BUILDING)}</div>
    </div>
  );
};
