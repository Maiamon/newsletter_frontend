import axios from "axios";
import { env } from "@/env"; 

export const api = axios.create({
  baseURL: env.VITE_API_URL,
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@newsletter:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor para lidar com erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove token inválido e redireciona para login
      localStorage.removeItem('@newsletter:token');
      window.location.href = '/sign-in';
    }
    
    return Promise.reject(error);
  }
);