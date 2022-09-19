import { API_URL } from '..';
import { IAge } from '../ages/ages-api';
import { ICiv } from '../civs/civs-api';
import { ApiConnectedUnit } from '../units/units-api';
import { ApiConnectedTech } from '../techs/techs-api';
import {
  convertTechToTechTreeItem,
  convertUnitToTechTreeItem,
  isUnique,
  ITechTreeItem,
  techTreeItemCompare,
  TechTreeItemType,
} from '../tech-tree-item-api';

interface ApiBuilding {
  id: number;
  buildingName: string;
  age: IAge;
  civs: ICiv[];
  units: ApiConnectedUnit[];
  techs: ApiConnectedTech[];
}

export type ApiConnectedBuilding = Pick<ApiBuilding, 'id' | 'buildingName'>;

export interface IBuilding extends ITechTreeItem {
  kind: TechTreeItemType;
  isUnique: boolean;
  age: IAge;
  civs: ICiv[];
  units: ITechTreeItem[];
  techs: ITechTreeItem[];
}

export async function getBuildings(): Promise<IBuilding[]> {
  const queryOptions =
    '?includeAges=true&includeCivs=true&includeUnits=true&includeTechs=true';
  const response = await fetch(`${API_URL}/buildings${queryOptions}`);
  const buildings = (await response.json()) as ApiBuilding[];

  return buildings
    .map((building) => {
      const { id, buildingName: itemName, age, civs, units, techs } = building;
      return {
        id,
        itemName,
        kind: TechTreeItemType.BUILDING,
        isUnique: isUnique(civs),
        age,
        civs,
        units: units.map((unit) => convertUnitToTechTreeItem(unit)),
        techs: techs.map((tech) => convertTechToTechTreeItem(tech)),
        tagIds: [],
      };
    })
    .sort(techTreeItemCompare);
}
