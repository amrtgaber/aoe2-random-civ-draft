import { ApiConnectedBuilding } from './buildings/buildings-api';
import { ApiConnectedTech } from './techs/techs-api';
import { ApiConnectedUnit } from './units/units-api';

import {
  convertBuildingToTechTreeItem,
  convertTechToTechTreeItem,
  convertUnitToTechTreeItem,
  isBuilding,
  isTech,
  isUnit,
  TechTreeItemType,
} from './tech-tree-item-api';

describe('tech-tree-item-api', () => {
  it('converts unit to tech tree item', () => {
    const mockApiUnit: ApiConnectedUnit = {
      id: 1000,
      unitName: 'archer',
    };

    const convertedUnit = convertUnitToTechTreeItem(mockApiUnit);

    expect(isUnit(convertedUnit)).toBe(true);
    expect(convertedUnit).toEqual({
      id: mockApiUnit.id,
      itemName: mockApiUnit.unitName,
      kind: TechTreeItemType.UNIT,
    });
  });

  it('converts tech to tech tree item', () => {
    const mockApiTech: ApiConnectedTech = {
      id: 1000,
      techName: 'loom',
    };

    const convertedTech = convertTechToTechTreeItem(mockApiTech);

    expect(isTech(convertedTech)).toBe(true);
    expect(convertedTech).toEqual({
      id: mockApiTech.id,
      itemName: mockApiTech.techName,
      kind: TechTreeItemType.TECH,
    });
  });

  it('converts building to tech tree item', () => {
    const mockApiBuilding: ApiConnectedBuilding = {
      id: 1000,
      buildingName: 'house',
    };

    const convertedBuilding = convertBuildingToTechTreeItem(mockApiBuilding);

    expect(isBuilding(convertedBuilding)).toBe(true);
    expect(convertedBuilding).toEqual({
      id: mockApiBuilding.id,
      itemName: mockApiBuilding.buildingName,
      kind: TechTreeItemType.BUILDING,
    });
  });
});
