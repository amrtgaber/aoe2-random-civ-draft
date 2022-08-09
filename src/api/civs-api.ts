import { API_URL } from '.';

export interface ICiv {
  civName: string;
  id: number;
}

export async function getCivs(): Promise<ICiv[]> {
  const response = await fetch(`${API_URL}/civs`);
  const civs = (await response.json()) as ICiv[];

  return civs
    .map((civ) => {
      const { civName, id } = civ;
      return { civName, id };
    })
    .sort((civ1, civ2) => (civ1.civName > civ2.civName ? 1 : -1));
}
