import { API_URL } from '..';
import { AuthBody } from '../auth/auth-api';
import { generateHeaders } from '../headers';

export interface ApiUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  username: string | null;
  drafts: [];
}

export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string | null;
}

export type UpdateUserBody = Partial<AuthBody>;

export async function getUser(): Promise<IUser> {
  const response = await fetch(`${API_URL}/users`, {
    method: 'get',
    headers: generateHeaders({ useAuth: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const user = (await response.json()) as ApiUser;

  return {
    id: user.id,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
    email: user.email,
    username: user.username,
  };
}

export async function updateUser(body: UpdateUserBody): Promise<IUser> {
  const response = await fetch(`${API_URL}/users`, {
    method: 'patch',
    body: JSON.stringify(body),
    headers: generateHeaders({ isJson: true, useAuth: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const user = (await response.json()) as ApiUser;

  return {
    id: user.id,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
    email: user.email,
    username: user.username,
  };
}

export async function deleteUser(): Promise<void> {
  const response = await fetch(`${API_URL}/users`, {
    method: 'delete',
    headers: generateHeaders({ useAuth: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
}
