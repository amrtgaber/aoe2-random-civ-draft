import { FC, useState } from 'react';

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
  const [leaveClass, setLeaveClass] = useState('');
  const { item, selected } = props;
  const dispatch = useAppDispatch();

  const kind = item.kind;
  const name = item.itemName;
  const imgSrc = `/assets/images/tech-tree/${kind}s/${name}.png`;
  const uniqueClass = item.isUnique ? 'unique' : '';
  const enterClass = selected ? 'enter-selected' : 'enter-unselected';

  const handleDeselectItem = () => {
    setLeaveClass('leave-selected');
  };

  const handleSelectItem = () => {
    setLeaveClass('leave-unselected');
  };

  const handleTransitionEnd = () => {
    if (selected) {
      dispatch(removeItemFromFilter(item));
      dispatch(addShownItem(item));
    } else {
      dispatch(addItemToFilter(item));
      dispatch(removeShownItem(item));
    }
  };

  return (
    <div className='tech-tree-item-container'>
      <div
        className={`tech-tree-item ${kind} ${uniqueClass} ${enterClass} ${leaveClass}`}
        onClick={selected ? handleDeselectItem : handleSelectItem}
        onTransitionEnd={handleTransitionEnd}
      >
        <img src={imgSrc} />
        <div className='tech-tree-item-name'>{name}</div>
      </div>
    </div>
  );
};
