import { IBuilding } from './buildings-api';
import { ICiv } from './civs-api';
import { ITech } from './techs-api';
import { IUnit } from './units-api';

export interface ITechTreeItem {
  id: number;
  itemName: string;
  kind: TechTreeItemType;
  civs?: ICiv[];
}

export enum TechTreeItemType {
  UNIT,
  TECH,
  BUILDING,
}

export function isUnit(item: ITechTreeItem): item is IUnit {
  return item.kind === TechTreeItemType.UNIT;
}

export function isTech(item: ITechTreeItem): item is ITech {
  return item.kind === TechTreeItemType.TECH;
}

export function isBuilding(item: ITechTreeItem): item is IBuilding {
  return item.kind === TechTreeItemType.BUILDING;
}
