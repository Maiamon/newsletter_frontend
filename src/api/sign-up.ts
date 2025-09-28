import { api } from "@/lib/axios";

export interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
  name: string;
  email: string;
}

export async function signUp({ name, email, password }: SignUpBody) {
  const response = await api.post<SignUpResponse>('/users', { name, email, password });
  
  return response.data;
}