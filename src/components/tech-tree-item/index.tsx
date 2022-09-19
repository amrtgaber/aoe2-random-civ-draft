import { FC } from 'react';

import './tech-tree-item.scss';
import { ITechTreeItem } from '../../api/tech-tree-item-api';
import { useAppDispatch } from '../../hooks';
import {
  addItemToFilter,
  addShownItem,
  removeItemFromFilter,
  removeShownItem,
} from '../../store/tech-tree-filter-slice';

export interface ITechTreeItemProps {
  item: ITechTreeItem;
  selected: boolean;
}

export const TechTreeItem: FC<ITechTreeItemProps> = (props) => {
  const { item, selected } = props;
  const dispatch = useAppDispatch();

  const kind = item.kind;
  const name = item.itemName;
  const imgSrc = `/assets/images/tech-tree/${kind}s/${name}.png`;
  const uniqueClass = item.isUnique ? 'unique' : '';

  const handleDeselectItem = () => {
    dispatch(removeItemFromFilter(item));
    dispatch(addShownItem(item));
  };

  const handleSelectItem = () => {
    dispatch(addItemToFilter(item));
    dispatch(removeShownItem(item));
  };

  return (
    <div className='tech-tree-item-container'>
      <div
        className={`tech-tree-item ${kind} ${uniqueClass}`}
        onClick={selected ? handleDeselectItem : handleSelectItem}
      >
        <img src={imgSrc} />
        <div className='tech-tree-item-name'>{name}</div>
      </div>
    </div>
  );
};
