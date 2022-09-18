import { FC, useEffect, useState } from 'react';
import { FilterTag, ITechTreeItem } from '../../api/tech-tree-item-api';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectTechTreeFilter,
  setShownItems,
} from '../../store/tech-tree-filter-slice';
import { addTagsToItem, getTagId, TAGS } from './tags';

import './tech-tree-filter-tags.scss';

export const TechTreeFilterTags: FC = () => {
  const [enabledTagIds, setEnabledTagIds] = useState<number[]>([0, 1, 2]);

  const { taggedItems } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

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
    const filteredItems = taggedItems.filter((item) => {
      if (!enabledTagIds.includes(getTagId('uniques')!) && item.isUnique) {
        return false;
      }

      return item.tagIds!.some((itemTagid) =>
        enabledTagIds.some((enabledId) => itemTagid === enabledId)
      );
    });

    dispatch(setShownItems(filteredItems));
  };

  const renderTags = (): JSX.Element[] => {
    return TAGS.map((tag) => {
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
      <div className='tags-title'>Filter items</div>
      <div className='tags-buttons'>{renderTags()}</div>
    </div>
  );
};
