import { API_URL } from '..';
import { generateHeaders } from '../headers';

export interface ApiDraft {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  desc?: string;
  private: boolean;
  gameVersion: string;
  ownerId: number;
  civs: [];
  _count: { likes: number };
}

export interface IDraft {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  desc?: string;
  private: boolean;
  gameVersion: string;
  ownerId: number;
  civs: [];
  likes: number;
}

export type CreateDraftBody = Pick<
  ApiDraft,
  'name' | 'desc' | 'private' | 'civs'
>;

export type UpdateDraftBody = Partial<CreateDraftBody>;

export async function createDraft(body: CreateDraftBody): Promise<IDraft> {
  const response = await fetch(`${API_URL}/drafts`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: generateHeaders({ isJson: true, useAuth: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const draft = (await response.json()) as ApiDraft;

  return {
    ...draft,
    createdAt: new Date(draft.createdAt).toISOString(),
    updatedAt: new Date(draft.updatedAt).toISOString(),
    likes: draft._count.likes,
  };
}

export async function getDrafts(): Promise<IDraft[]> {
  const response = await fetch(`${API_URL}/drafts`, {
    method: 'get',
    headers: generateHeaders({ useAuth: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const drafts = (await response.json()) as ApiDraft[];

  return drafts.map((draft) => ({
    ...draft,
    createdAt: new Date(draft.createdAt).toISOString(),
    updatedAt: new Date(draft.updatedAt).toISOString(),
    likes: draft._count.likes,
  }));
}

export async function getDraft(id: number): Promise<IDraft> {
  const response = await fetch(`${API_URL}/drafts/${id}`, {
    method: 'get',
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const draft = (await response.json()) as ApiDraft;

  return {
    ...draft,
    createdAt: new Date(draft.createdAt).toISOString(),
    updatedAt: new Date(draft.updatedAt).toISOString(),
    likes: draft._count.likes,
  };
}

export async function updateDraft(
  id: number,
  body: UpdateDraftBody,
): Promise<IDraft> {
  const response = await fetch(`${API_URL}/drafts/${id}`, {
    method: 'patch',
    body: JSON.stringify(body),
    headers: generateHeaders({ isJson: true, useAuth: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const draft = (await response.json()) as ApiDraft;

  return {
    ...draft,
    createdAt: new Date(draft.createdAt).toISOString(),
    updatedAt: new Date(draft.updatedAt).toISOString(),
    likes: draft._count.likes,
  };
}

export async function deleteDraft(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/drafts/${id}`, {
    method: 'delete',
    headers: generateHeaders({ useAuth: true }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
}
