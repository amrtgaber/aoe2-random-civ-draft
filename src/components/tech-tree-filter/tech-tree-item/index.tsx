import { FC, ReactElement, useState } from 'react';

import './tech-tree-item.scss';
import { isTech, isUnit, ITechTreeItem } from '../../../api/tech-tree-item-api';
import { useAppDispatch } from '../../../hooks';
import {
  addItemToFilter,
  addShownItem,
  removeItemFromFilter,
  removeShownItem,
} from '../../../store/slices/tech-tree-filter-slice';

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
  const ageFilename = item.age!.ageName.replace(' ', '_');

  const imgSrc = `/assets/images/tech-tree/${kind}s/${name}.png`;
  const ageIconSrc = `assets/images/tech-tree/age-icons/${ageFilename}.png`;

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

  const renderBuildingIcons = (
    item: ITechTreeItem,
  ): ReactElement<HTMLImageElement>[] => {
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
            <div className='tech-tree-item-age-icons'>
              <img
                src={ageIconSrc}
                className='tech-tree-item-age-icon'
                alt={`${name} age`}
              />
            </div>
            <div className='tech-tree-item-building-icons'>
              {renderBuildingIcons(item)}
            </div>
          </div>
        </div>
        <img src={imgSrc} className='tech-tree-item-img' alt={name} />
        <div className='tech-tree-item-name'>{name}</div>
      </div>
    </div>
  );
};
