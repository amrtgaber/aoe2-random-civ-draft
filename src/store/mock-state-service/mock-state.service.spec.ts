import { isBuilding, isTech, isUnit } from '../../api/tech-tree-item-api';
import { store } from '..';

import {
  configureMockStore,
  getMockCiv,
  getMockCivs,
  getMockTechTreeBuilding,
  getMockTechTreeBuildings,
  getMockTechTreeItems,
  getMockTechTreeTech,
  getMockTechTreeTechs,
  getMockTechTreeUnit,
  getMockTechTreeUnits,
} from '.';
import { civsInitialState } from '../slices/civs-slice';

describe('mock state service', () => {
  describe('configure test store', () => {
    it('returns test store with initial state', () => {
      const mockStore = configureMockStore();
      expect(mockStore.getState()).toEqual(store.getState());
    });

    it('returns test store with provided state', () => {
      const mockCivs = getMockCivs();

      const mockStore = configureMockStore({
        civs: {
          ...civsInitialState,
          allCivs: mockCivs,
        },
      });

      expect(mockStore.getState().civs.allCivs.length).toEqual(mockCivs.length);
    });
  });

  it('gets mock tech tree items', () => {
    const mockItems = getMockTechTreeItems();
    expect(mockItems.length).toBeGreaterThan(0);
  });

  describe('mock units', () => {
    it('gets a mock tech tree unit', () => {
      const mockUnit = getMockTechTreeUnit();
      expect(isUnit(mockUnit)).toBe(true);
    });

    it('gets mock tech tree units', () => {
      const mockUnits = getMockTechTreeUnits();
      expect(mockUnits.length).toBeGreaterThan(0);
      expect(mockUnits.every((unit) => isUnit(unit))).toBe(true);
    });
  });

  describe('mock techs', () => {
    it('gets a mock tech tree tech', () => {
      const mockTech = getMockTechTreeTech();
      expect(isTech(mockTech)).toBe(true);
    });

    it('gets mock tech tree techs', () => {
      const mockTechs = getMockTechTreeTechs();
      expect(mockTechs.length).toBeGreaterThan(0);
      expect(mockTechs.every((tech) => isTech(tech))).toBe(true);
    });
  });

  describe('mock buildings', () => {
    it('gets a mock tech tree building', () => {
      const mockBuilding = getMockTechTreeBuilding();
      expect(isBuilding(mockBuilding)).toBe(true);
    });

    it('gets mock tech tree buildings', () => {
      const mockBuildings = getMockTechTreeBuildings();
      expect(mockBuildings.length).toBeGreaterThan(0);
      expect(mockBuildings.every((building) => isBuilding(building))).toBe(
        true
      );
    });
  });

  describe('mock civs', () => {
    it('gets a mock civ', () => {
      const mockCiv = getMockCiv();
      expect(mockCiv.civName).toBeDefined();
    });

    it('gets mock civs', () => {
      const mockCivs = getMockCivs();
      expect(mockCivs.length).toBeGreaterThan(0);
      expect(mockCivs.every((civ) => civ.civName.length > 0)).toBe(true);
    });
  });
});
