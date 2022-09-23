import { IBuilding } from '../../api/buildings/buildings-api';
import { ITech } from '../../api/techs/techs-api';
import { IUnit } from '../../api/units/units-api';
import {
  isBuilding,
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../api/tech-tree-item-api';

import { MOCK_STATE } from './mock-state';

export function getMockTechTreeItems(): ITechTreeItem[] {
  return MOCK_STATE.techTreeFilter.taggedItems;
}

export function getMockTechTreeUnit(): IUnit {
  return MOCK_STATE.techTreeFilter.taggedItems.find((item) =>
    isUnit(item)
  ) as IUnit;
}

export function getMockTechTreeUnits(): IUnit[] {
  return MOCK_STATE.techTreeFilter.taggedItems.filter((item) =>
    isUnit(item)
  ) as IUnit[];
}

export function getMockTechTreeTech(): ITech {
  return MOCK_STATE.techTreeFilter.taggedItems.find((item) =>
    isTech(item)
  ) as ITech;
}

export function getMockTechTreeTechs(): ITech[] {
  return MOCK_STATE.techTreeFilter.taggedItems.filter((item) =>
    isTech(item)
  ) as ITech[];
}

export function getMockTechTreeBuilding(): IBuilding {
  return MOCK_STATE.techTreeFilter.taggedItems.find((item) =>
    isBuilding(item)
  ) as IBuilding;
}

export function getMockTechTreeBuildings(): IBuilding[] {
  return MOCK_STATE.techTreeFilter.taggedItems.filter((item) =>
    isBuilding(item)
  ) as IBuilding[];
}
