import {
  getMockTechTreeBuilding,
  getMockTechTreeBuildings,
  getMockTechTreeItems,
  getMockTechTreeTech,
  getMockTechTreeTechs,
  getMockTechTreeUnit,
  getMockTechTreeUnits,
} from '.';
import { isBuilding, isTech, isUnit } from '../../api/tech-tree-item-api';

describe('mock state service', () => {
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
});
