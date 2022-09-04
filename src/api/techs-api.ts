import { API_URL } from '.';
import { ICiv } from './civs-api';
import { ITechTreeItem, TechTreeItemType } from './tech-tree-item-api';

interface ApiTech {
  id: number;
  techName: string;
  civs: ICiv[];
}

export interface ITech extends ITechTreeItem {
  kind: TechTreeItemType;
  civs: ICiv[];
}

export async function getTechs(): Promise<ITech[]> {
  const response = await fetch(`${API_URL}/techs`);
  const techs = (await response.json()) as ApiTech[];

  return techs
    .map((tech) => {
      const { id, techName: itemName, civs } = tech;
      return { id, itemName, civs, kind: TechTreeItemType.TECH };
    })
    .sort((tech1, tech2) => (tech1.itemName > tech2.itemName ? 1 : -1));
}
