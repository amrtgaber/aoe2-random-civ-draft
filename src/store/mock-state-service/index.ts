import { configureStore } from '@reduxjs/toolkit';

import { IBuilding } from '../../api/buildings/buildings-api';
import { ITech } from '../../api/techs/techs-api';
import { IUnit } from '../../api/units/units-api';
import { ICiv } from '../../api/civs/civs-api';
import {
  isBuilding,
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../api/tech-tree-item-api';
import { reducer, RootState } from '../';

import { MOCK_STATE } from './mock-state';

export function configureMockStore(state?: Partial<RootState>) {
  return configureStore({
    reducer,
    preloadedState: state,
  });
}

export function getMockTechTreeItems(): ITechTreeItem[] {
  return [...MOCK_STATE.techTreeFilter.taggedItems];
}

export function getMockTechTreeUnit(): IUnit {
  const mockUnit = MOCK_STATE.techTreeFilter.taggedItems.find((item) =>
    isUnit(item)
  ) as IUnit;

  return { ...mockUnit };
}

export function getMockTechTreeUnits(): IUnit[] {
  const mockUnits = MOCK_STATE.techTreeFilter.taggedItems.filter((item) =>
    isUnit(item)
  ) as IUnit[];

  return [...mockUnits];
}

export function getMockTechTreeTech(): ITech {
  const mockTech = MOCK_STATE.techTreeFilter.taggedItems.find((item) =>
    isTech(item)
  ) as ITech;

  return { ...mockTech };
}

export function getMockTechTreeTechs(): ITech[] {
  const mockTechs = MOCK_STATE.techTreeFilter.taggedItems.filter((item) =>
    isTech(item)
  ) as ITech[];

  return [...mockTechs];
}

export function getMockTechTreeBuilding(): IBuilding {
  const mockBuilding = MOCK_STATE.techTreeFilter.taggedItems.find((item) =>
    isBuilding(item)
  ) as IBuilding;

  return { ...mockBuilding };
}

export function getMockTechTreeBuildings(): IBuilding[] {
  const mockBuildings = MOCK_STATE.techTreeFilter.taggedItems.filter((item) =>
    isBuilding(item)
  ) as IBuilding[];

  return [...mockBuildings];
}

export function getMockCiv(): ICiv {
  const mockCiv = MOCK_STATE.civs.allCivs[0];
  return { ...mockCiv };
}

export function getMockCivs(): ICiv[] {
  return [...MOCK_STATE.civs.allCivs];
}
