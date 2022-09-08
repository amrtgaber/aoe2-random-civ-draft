import { API_URL } from '..';
import { ITechTreeItem } from '../tech-tree-item-api';

export interface IAge {
  id: number;
  ageName: string;
  units: ITechTreeItem[];
  techs: ITechTreeItem[];
  buildings: ITechTreeItem[];
}

export async function getAges(): Promise<IAge[]> {
  const queryOptions =
    '?includeUnits=true&includeTechs=true&includeBuildings=true';
  const response = await fetch(`${API_URL}/ages${queryOptions}`);
  const ages = (await response.json()) as IAge[];

  return ages
    .map((age) => {
      const { id, ageName, units, techs, buildings } = age;
      return { id, ageName, units, techs, buildings };
    })
    .sort((age1, age2) => age1.id - age2.id);
}
