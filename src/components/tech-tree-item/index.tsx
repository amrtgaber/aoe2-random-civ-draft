import { FC } from 'react';

import { IUnitTechTree } from '../../api/units-api';
import { IBuildingTechTree } from '../../api/buildings-api';
import { ITechTechTree } from '../../api/techs-api';

import './tech-tree-item.scss';

export type TechTreeItemType =
  | IUnitTechTree
  | ITechTechTree
  | IBuildingTechTree;

export interface ITechTreeItemProps {
  item: TechTreeItemType;
  selected: boolean;
  addToFilter: (item: TechTreeItemType) => void;
  removeFromFilter: (item: TechTreeItemType) => void;
}

export function isUnit(item: TechTreeItemType): item is IUnitTechTree {
  return 'unitName' in item;
}

export function isTech(item: TechTreeItemType): item is ITechTechTree {
  return 'techName' in item;
}

export function isBuilding(item: TechTreeItemType): item is IBuildingTechTree {
  return 'buildingName' in item;
}

export const TechTreeItem: FC<ITechTreeItemProps> = (props) => {
  const { item, selected, addToFilter, removeFromFilter } = props;

  const unitsBaseImgUrl = `/assets/images/tech-tree/units`;
  const techsBaseImgUrl = `/assets/images/tech-tree/techs`;
  const buildingsBaseImgUrl = `/assets/images/tech-tree/buildings`;

  let name = '';
  let imgSrc = '';
  let classes = 'tech-tree-item';

  if (isUnit(item)) {
    name = item.unitName;
    imgSrc = `${unitsBaseImgUrl}/${name}.png`;
    classes += ' unit';
  }

  if (isTech(item)) {
    name = item.techName;
    imgSrc = `${techsBaseImgUrl}/${name}.png`;
    classes += ' tech';
  }

  if (isBuilding(item)) {
    name = item.buildingName;
    imgSrc = `${buildingsBaseImgUrl}/${name}.png`;
    classes += ' building';
  }

  return (
    <div className='tech-tree-item-container'>
      <div
        className={classes}
        key={item.id}
        onClick={
          selected ? () => removeFromFilter(item) : () => addToFilter(item)
        }
      >
        <img src={imgSrc} />
        <div>{name}</div>
      </div>
    </div>
  );
};
