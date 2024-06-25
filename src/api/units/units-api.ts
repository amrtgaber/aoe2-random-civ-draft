import { API_URL } from '..';
import { IAge } from '../ages/ages-api';
import { ApiConnectedBuilding } from '../buildings/buildings-api';
import { ICiv } from '../civs/civs-api';
import {
  convertBuildingToTechTreeItem,
  isUnique,
  ITechTreeItem,
  techTreeItemCompare,
  TechTreeItemType,
} from '../tech-tree-item-api';

export interface ApiUnit {
  id: number;
  unitName: string;
  age: IAge;
  civs: ICiv[];
  buildings: ApiConnectedBuilding[];
}

export type ApiConnectedUnit = Pick<ApiUnit, 'id' | 'unitName'>;

export interface IUnit extends ITechTreeItem {
  kind: TechTreeItemType;
  isUnique: boolean;
  age: IAge;
  civs: ICiv[];
  buildings: ITechTreeItem[];
}

export async function getUnits(): Promise<IUnit[]> {
  const queryOptions =
    '?includeAge=true&includeCivs=true&includeBuildings=true';
  const response = await fetch(`${API_URL}/units${queryOptions}`);
  const units = (await response.json()) as ApiUnit[];

  return units
    .map((unit) => {
      const { id, unitName: itemName, age, civs, buildings } = unit;
      return {
        id,
        itemName,
        kind: TechTreeItemType.UNIT,
        isUnique: isUnique(civs),
        age,
        civs,
        buildings: buildings.map((building) =>
          convertBuildingToTechTreeItem(building)
        ),
        tagIds: [],
      };
    })
    .sort(techTreeItemCompare);
}
