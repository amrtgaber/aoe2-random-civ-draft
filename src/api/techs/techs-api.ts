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

export interface ApiTech {
  id: number;
  techName: string;
  age: IAge;
  civs: ICiv[];
  buildings: ApiConnectedBuilding[];
}

export type ApiConnectedTech = Pick<ApiTech, 'id' | 'techName'>;

export interface ITech extends ITechTreeItem {
  kind: TechTreeItemType;
  isUnique: boolean;
  age: IAge;
  civs: ICiv[];
  buildings: ITechTreeItem[];
}

export async function getTechs(): Promise<ITech[]> {
  const queryOptions =
    '?includeAge=true&includeCivs=true&includeBuildings=true';
  const response = await fetch(`${API_URL}/techs${queryOptions}`);
  const techs = (await response.json()) as ApiTech[];

  return techs
    .map((tech) => {
      const { id, techName: itemName, age, civs, buildings } = tech;
      return {
        id,
        itemName,
        kind: TechTreeItemType.TECH,
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
