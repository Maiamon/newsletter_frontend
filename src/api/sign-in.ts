import { api } from "@/lib/axios";

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export async function signIn({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>('/auth/login', { email, password });
  
  return response.data;
}
