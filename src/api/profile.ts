import { api } from '@/lib/axios';

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface UserProfile {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
  preferences: Category[];
}

export interface UpdateProfileRequest {
  name: string;
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await api.get('/user/profile');
  return response.data;
}

export async function updateUserProfile(data: UpdateProfileRequest): Promise<UserProfile> {
  const response = await api.put('/user/profile', data);
  return response.data;
}