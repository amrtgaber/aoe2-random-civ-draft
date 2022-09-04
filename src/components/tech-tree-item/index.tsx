import { FC } from 'react';

import './tech-tree-item.scss';
import {
  isBuilding,
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../api/tech-tree-item-api';
import { useAppDispatch } from '../../hooks';
import {
  addItemToFilter,
  removeItemFromFilter,
} from '../../store/draft-parameters-slice';

export interface ITechTreeItemProps {
  item: ITechTreeItem;
  selected: boolean;
}

export const TechTreeItem: FC<ITechTreeItemProps> = (props) => {
  const { item, selected } = props;
  const dispatch = useAppDispatch();

  const unitsBaseImgUrl = `/assets/images/tech-tree/units`;
  const techsBaseImgUrl = `/assets/images/tech-tree/techs`;
  const buildingsBaseImgUrl = `/assets/images/tech-tree/buildings`;

  const name = item.itemName;
  let imgSrc = '';
  let classes = 'tech-tree-item';

  if (isUnit(item)) {
    imgSrc = `${unitsBaseImgUrl}/${name}.png`;
    classes += ' unit';
  }

  if (isTech(item)) {
    imgSrc = `${techsBaseImgUrl}/${name}.png`;
    classes += ' tech';
  }

  if (isBuilding(item)) {
    imgSrc = `${buildingsBaseImgUrl}/${name}.png`;
    classes += ' building';
  }

  if (item.isUnique) {
    classes += ' unique';
  }

  return (
    <div className='tech-tree-item-container'>
      <div
        className={classes}
        key={item.id}
        onClick={
          selected
            ? () => dispatch(removeItemFromFilter(item))
            : () => dispatch(addItemToFilter(item))
        }
      >
        <img src={imgSrc} />
        <div className='tech-tree-item-name'>{name}</div>
      </div>
    </div>
  );
};
