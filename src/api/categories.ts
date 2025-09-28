import { api } from "@/lib/axios";

export interface Category {
  id: number;
  name: string;
}

interface CategoriesResponse {
  categories: Category[];
  totalCount: number;
}

export async function getCategories(): Promise<Category[]> {
  
  try {
    const response = await api.get<CategoriesResponse>('/categories');    
    // Extrair o array de categorias do objeto de resposta
    const categories = response.data?.categories || [];

    return categories;
  } catch (error) {
    
    // Em caso de erro, retornar array vazio
    return [];
  }
}