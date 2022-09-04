import { API_URL } from '.';
import { ICiv } from './civs-api';
import { getId, ITechTreeItem, TechTreeItemType } from './tech-tree-item-api';

interface ApiTech {
  id: number;
  techName: string;
  civs: ICiv[];
}

const TECH_MIN_ID = 2000;

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
      const isUnique = civs.length === 1;
      return {
        id: getId(id, TECH_MIN_ID),
        itemName,
        civs,
        isUnique,
        kind: TechTreeItemType.TECH,
      };
    })
    .sort((tech1, tech2) => (tech1.itemName > tech2.itemName ? 1 : -1));
}
