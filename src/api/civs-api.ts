import { API_URL } from '.';
import { IBuilding } from './buildings-api';
import { ITech } from './techs-api';
import { IUnit } from './units-api';

export interface ICiv {
  id: number;
  civName: string;
}

export interface ICivTechTree extends ICiv {
  units: IUnit[];
  techs: ITech[];
  buildings: IBuilding[];
}

export async function getCivs(): Promise<ICiv[]> {
  const response = await fetch(`${API_URL}/civs`);
  const civs = (await response.json()) as ICiv[];

  return civs
    .map((civ) => {
      const { id, civName } = civ;
      return { id, civName };
    })
    .sort((civ1, civ2) => (civ1.civName > civ2.civName ? 1 : -1));
}
