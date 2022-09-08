import { API_URL } from '..';
import { ICiv } from '../civs/civs-api';
import { ITechTreeItem, TechTreeItemType } from '../tech-tree-item-api';

interface ApiBuilding {
  id: number;
  buildingName: string;
  civs: ICiv[];
}

export interface IBuilding extends ITechTreeItem {
  kind: TechTreeItemType;
  civs: ICiv[];
}

export async function getBuildings(): Promise<IBuilding[]> {
  const response = await fetch(`${API_URL}/buildings`);
  const buildings = (await response.json()) as ApiBuilding[];

  return buildings
    .map((building) => {
      const { id, buildingName: itemName, civs } = building;
      const isUnique = civs.length === 1;
      return {
        id,
        itemName,
        civs,
        isUnique,
        kind: TechTreeItemType.BUILDING,
      };
    })
    .sort((building1, building2) =>
      building1.itemName > building2.itemName ? 1 : -1
    );
}
