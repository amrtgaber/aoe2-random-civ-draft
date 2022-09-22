import { FC, useState } from 'react';

import './tech-tree-item.scss';
import { isTech, isUnit, ITechTreeItem } from '../../api/tech-tree-item-api';
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
  const [leaveClass, setLeaveClass] = useState('');
  const dispatch = useAppDispatch();

  const kind = item.kind;
  const name = item.itemName;
  const age = item.age!;
  const imgSrc = `/assets/images/tech-tree/${kind}s/${name}.png`;
  const uniqueClass = item.isUnique ? 'unique' : '';
  const enterClass = selected ? 'enter-selected' : 'enter-unselected';

  const ageIcons: { [key: string]: string } = {
    ['dark age']: '/assets/images/tech-tree/age-icons/dark_age.png',
    ['feudal age']: '/assets/images/tech-tree/age-icons/feudal_age.png',
    ['castle age']: '/assets/images/tech-tree/age-icons/castle_age.png',
    ['imperial age']: '/assets/images/tech-tree/age-icons/imperial_age.png',
  };

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

  const renderBuildingIcons = (item: ITechTreeItem): JSX.Element[] => {
    const imgBase = '/assets/images/tech-tree/buildings/';

    if (isUnit(item) || isTech(item)) {
      return item.buildings.map((building) => (
        <img
          key={building.id}
          src={`${imgBase}/${building.itemName}.png`}
          className='tech-tree-item-building-icon'
          alt={`${building.itemName}`}
        />
      ));
    } else {
      return [];
    }
  };

  return (
    <div className='tech-tree-item-container'>
      <div
        className={`tech-tree-item ${kind} ${uniqueClass} ${enterClass} ${leaveClass}`}
        onClick={selected ? handleDeselectItem : handleSelectItem}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className='tech-tree-item-icons-container'>
          <div className='tech-tree-item-icons'>
            {renderBuildingIcons(item)}
            <img
              src={ageIcons[age.ageName]}
              className='tech-tree-item-age-icon'
              alt={`${name} age`}
            />
          </div>
        </div>
        <img src={imgSrc} className='tech-tree-item-img' alt={`${name}`} />
        <div className='tech-tree-item-name'>{name}</div>
      </div>
    </div>
  );
};
