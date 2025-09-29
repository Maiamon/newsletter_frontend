import { api } from '@/lib/axios';

export interface UpdatePreferencesRequest {
  userId: string;
  categoryIds: number[];
}

export interface UpdatePreferencesResponse {
  success: boolean;
  updatedPreferences: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface UserPreferencesResponse {
  preferences: number[]; // Array de IDs das categorias
}

export interface PreferenceCategoriesResponse {
  categories: Category[];
}

export async function getPreferenceCategories(): Promise<Category[]> {
  const response = await api.get<PreferenceCategoriesResponse>('/preferences');
  return response.data.categories || [];
}

export async function getUserPreferences(): Promise<UserPreferencesResponse> {
  const response = await api.get('/users/me/preferences');
  return response.data;
}

export async function updateUserPreferences(data: UpdatePreferencesRequest): Promise<UpdatePreferencesResponse> {
  const response = await api.put('/users/me/preferences', data);
  return response.data;
}