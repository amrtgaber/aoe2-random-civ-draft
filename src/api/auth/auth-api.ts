import { API_URL } from '..';
import { generateHeaders } from '../headers';

export interface ApiAuth {
  access_token: string;
  refresh_token: string;
}

export interface AuthBody {
  email: string;
  username: string | null;
  password: string;
}

export async function signup(authBody: AuthBody): Promise<ApiAuth> {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'post',
    body: JSON.stringify(authBody),
    headers: generateHeaders({ isJson: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const tokens = (await response.json()) as ApiAuth;
  return tokens;
}

export async function login(authBody: AuthBody): Promise<ApiAuth> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'post',
    body: JSON.stringify(authBody),
    headers: generateHeaders({ isJson: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const tokens = (await response.json()) as ApiAuth;
  return tokens;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'post',
    headers: generateHeaders({ useAuth: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
}

export async function refresh(): Promise<ApiAuth> {
  const response = await fetch(`${API_URL}/refresh`, {
    method: 'post',
    headers: generateHeaders({
      additionalHeaders: [
        {
          name: 'Authorization',
          value: `Bearer ${localStorage.getItem('refresh_token') ?? ''}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const tokens = (await response.json()) as ApiAuth;
  return tokens;
}
