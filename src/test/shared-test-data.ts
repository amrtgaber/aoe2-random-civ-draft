import { configureStore } from '@reduxjs/toolkit';

import { reducer, RootState } from '../store';
import { IAge } from '../api/ages/ages-api';
import { ICiv } from '../api/civs/civs-api';
import { ITechTreeItem, TechTreeItemType } from '../api/tech-tree-item-api';

export function configureTestStore(state?: Partial<RootState>) {
  return configureStore({
    reducer,
    preloadedState: state,
  });
}

export const TEST_AGES: IAge[] = [
  {
    id: 1,
    ageName: 'dark age',
  },
  {
    id: 2,
    ageName: 'feudal age',
  },
  {
    id: 3,
    ageName: 'castle age',
  },
  {
    id: 4,
    ageName: 'imperial age',
  },
];

export const TEST_CIVS: ICiv[] = [
  {
    id: 1000,
    civName: 'Aztecs',
  },
  {
    id: 1001,
    civName: 'Franks',
  },
  {
    id: 1002,
    civName: 'Vikings',
  },
];

export const TEST_BUILDINGS: ITechTreeItem[] = [
  {
    id: 1003,
    itemName: 'castle',
    kind: TechTreeItemType.BUILDING,
    isUnique: false,
  },
  {
    id: 1004,
    itemName: 'house',
    kind: TechTreeItemType.BUILDING,
    isUnique: false,
  },
  {
    id: 1005,
    itemName: 'stable',
    kind: TechTreeItemType.BUILDING,
    isUnique: false,
  },
];

export const TEST_UNITS: ITechTreeItem[] = [
  {
    id: 1006,
    itemName: 'archer',
    kind: TechTreeItemType.UNIT,
    isUnique: false,
  },
  {
    id: 1007,
    itemName: 'knight',
    kind: TechTreeItemType.UNIT,
    isUnique: false,
  },
  {
    id: 1008,
    itemName: 'skirmisher',
    kind: TechTreeItemType.UNIT,
    isUnique: false,
  },
];

export const TEST_TECHS: ITechTreeItem[] = [
  {
    id: 1009,
    itemName: 'fletching',
    kind: TechTreeItemType.TECH,
    isUnique: false,
  },
  {
    id: 1010,
    itemName: 'loom',
    kind: TechTreeItemType.TECH,
    isUnique: false,
  },
  {
    id: 1011,
    itemName: 'sanctity',
    kind: TechTreeItemType.TECH,
    isUnique: false,
  },
];
