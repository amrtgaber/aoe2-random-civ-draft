import { IAge } from './ages/ages-api';
import { ICiv } from './civs/civs-api';
import { ApiConnectedUnit, IUnit } from './units/units-api';
import { ApiConnectedTech, ITech } from './techs/techs-api';
import { ApiConnectedBuilding, IBuilding } from './buildings/buildings-api';

export interface FilterTag {
  id: number;
  tagName: string;
}

export interface ITechTreeItem {
  id: number;
  itemName: string;
  kind: TechTreeItemType;
  isUnique?: boolean;
  age?: IAge;
  civs?: ICiv[];
  tagIds?: number[];
}

export enum TechTreeItemType {
  UNIT = 'unit',
  TECH = 'tech',
  BUILDING = 'building',
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

export function isUnique(civs: ICiv[]): boolean {
  return civs.length === 1;
}

export function convertUnitToTechTreeItem(
  item: ApiConnectedUnit
): ITechTreeItem {
  const { id, unitName: itemName } = item;
  return {
    id,
    itemName,
    kind: TechTreeItemType.UNIT,
  };
}

export function convertTechToTechTreeItem(
  item: ApiConnectedTech
): ITechTreeItem {
  const { id, techName: itemName } = item;
  return {
    id,
    itemName,
    kind: TechTreeItemType.TECH,
  };
}

export function convertBuildingToTechTreeItem(
  item: ApiConnectedBuilding
): ITechTreeItem {
  const { id, buildingName: itemName } = item;
  return {
    id,
    itemName,
    kind: TechTreeItemType.BUILDING,
  };
}

export function techTreeItemCompare(
  item1: ITechTreeItem,
  item2: ITechTreeItem
): 1 | -1 {
  return item1.itemName > item2.itemName ? 1 : -1;
}
