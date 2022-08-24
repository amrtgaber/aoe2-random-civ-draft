import { API_URL } from '.';
import { ICiv } from './civs-api';

export interface IBuilding {
  id: number;
  buildingName: string;
}

export interface IBuildingTechTree extends IBuilding {
  civs: ICiv[];
}

export async function getBuildings(): Promise<IBuildingTechTree[]> {
  const response = await fetch(`${API_URL}/buildings`);
  const buildings = (await response.json()) as IBuildingTechTree[];

  return buildings
    .map((building) => {
      const { id, buildingName, civs } = building;
      return { id, buildingName, civs };
    })
    .sort((building1, building2) =>
      building1.buildingName > building2.buildingName ? 1 : -1
    );
}
