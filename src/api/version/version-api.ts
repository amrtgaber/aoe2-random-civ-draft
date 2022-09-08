import { API_URL } from '..';

export interface IVersion {
  gameVersion: string;
}

export async function getVersion(): Promise<string> {
  const response = await fetch(`${API_URL}/versions`);
  const versions = (await response.json()) as IVersion;
  return versions.gameVersion;
}
