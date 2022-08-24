import { API_URL } from '.';
import { ICiv } from './civs-api';

export interface IUnit {
  id: number;
  unitName: string;
}

export interface IUnitTechTree extends IUnit {
  civs: ICiv[];
}

export async function getUnits(): Promise<IUnitTechTree[]> {
  const response = await fetch(`${API_URL}/units`);
  const units = (await response.json()) as IUnitTechTree[];

  return units
    .map((unit) => {
      const { id, unitName, civs } = unit;
      return { id, unitName, civs };
    })
    .sort((unit1, unit2) => (unit1.unitName > unit2.unitName ? 1 : -1));
}
