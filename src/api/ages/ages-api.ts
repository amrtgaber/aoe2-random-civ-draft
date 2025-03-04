import { API_URL } from '..';
import { ApiConnectedTech } from '../techs/techs-api';
import { ApiConnectedUnit } from '../units/units-api';
import { ApiConnectedBuilding } from '../buildings/buildings-api';
import {
  convertBuildingToTechTreeItem,
  convertTechToTechTreeItem,
  convertUnitToTechTreeItem,
  ITechTreeItem,
} from '../tech-tree-item-api';

export interface ApiAge {
  id: number;
  ageName: string;
  units: ApiConnectedUnit[];
  techs: ApiConnectedTech[];
  buildings: ApiConnectedBuilding[];
}

export interface IAge {
  id: number;
  ageName: string;
}

export interface IAgeTechTree extends IAge {
  units: ITechTreeItem[];
  techs: ITechTreeItem[];
  buildings: ITechTreeItem[];
}

export async function getAges(): Promise<IAgeTechTree[]> {
  const queryOptions =
    '?includeUnits=true&includeTechs=true&includeBuildings=true';
  const response = await fetch(`${API_URL}/ages${queryOptions}`);
  const ages = (await response.json()) as ApiAge[];

  return ages
    .map((age) => {
      const { id, ageName, units, techs, buildings } = age;
      return {
        id,
        ageName,
        units: units.map((unit) => convertUnitToTechTreeItem(unit)),
        techs: techs.map((tech) => convertTechToTechTreeItem(tech)),
        buildings: buildings.map((building) =>
          convertBuildingToTechTreeItem(building),
        ),
      };
    })
    .sort((age1, age2) => age1.id - age2.id);
}
