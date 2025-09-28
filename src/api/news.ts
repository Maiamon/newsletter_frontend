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
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export async function getNews(params: SearchNewsParams): Promise<NewsResponse> {
  console.log('🚀 GetNews - Buscando notícias com parâmetros:', params);
  
  try {
    const response = await api.get<NewsResponse>('/news', { params });
    
    console.log('✅ GetNews - Resposta recebida:', {
      total: response.data.totalItems,
      pages: response.data.totalPages,
      current: response.data.currentPage,
      newsCount: response.data.news.length
    });
    
    // Converte as datas de string para Date
    response.data.news = response.data.news.map(item => ({
      ...item,
      publishedAt: new Date(item.publishedAt)
    }));
    
    return response.data;
  } catch (error) {
    console.error('❌ GetNews - Erro na requisição:', error);
    throw error;
  }
}