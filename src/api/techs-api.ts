import { API_URL } from '.';
import { ICiv } from './civs-api';

export interface ITech {
  id: number;
  techName: string;
}

export interface ITechTechTree extends ITech {
  civs: ICiv[];
}

export async function getTechs(): Promise<ITechTechTree[]> {
  const response = await fetch(`${API_URL}/techs`);
  const techs = (await response.json()) as ITechTechTree[];

  return techs
    .map((tech) => {
      const { id, techName, civs } = tech;
      return { id, techName, civs };
    })
    .sort((tech1, tech2) => (tech1.techName > tech2.techName ? 1 : -1));
}
