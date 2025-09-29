import { api } from "@/lib/axios";

export interface News {
  id: number;
  title: string;
  content: string;
  publishedAt: Date;
  summary?: string;
  source?: string;
  categories: {
    id: number;
    name: string;
  }[];
}

export interface SearchNewsParams {
  page: number;
  limit: number;
  period?: 'day' | 'week' | 'month';
  category?: string;
}

export interface NewsResponse {
  news: News[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Interface para compatibilidade com o frontend
export interface NewsResponseFormatted {
  news: News[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export async function getNews(params: SearchNewsParams): Promise<NewsResponseFormatted> {
  
  try {
    const response = await api.get<NewsResponse>('/news', { params });
    
    console.log('✅ GetNews - Resposta recebida:', {
      total: response.data.pagination.totalCount,
      pages: response.data.pagination.totalPages,
      current: response.data.pagination.currentPage,
      newsCount: response.data.news.length
    });
    
    // Converte as datas de string para Date
    const newsWithDates = response.data.news.map(item => ({
      ...item,
      publishedAt: new Date(item.publishedAt)
    }));
    
    // Mapeia para o formato esperado pelo frontend
    return {
      news: newsWithDates,
      totalPages: response.data.pagination.totalPages,
      totalItems: response.data.pagination.totalCount,
      currentPage: response.data.pagination.currentPage,
    };
  } catch (error) {
    console.error('❌ GetNews - Erro na requisição:', error);
    throw error;
  }
}