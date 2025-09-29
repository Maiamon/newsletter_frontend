import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDocumentTitle, useDocumentMeta } from "../../../lib/document-head";
import { getNews } from "@/api/news";
import type { SearchNewsParams } from "@/api/news";
import { NewsCardAlternate } from "@/components/ui/news-card-alternate";
import { NewsFilters } from "@/components/ui/news-filters";
import { NewsPagination } from "@/components/ui/news-pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function Dashboard() {
  // Usando hooks para definir título e meta tags
  useDocumentTitle("Dashboard");
  useDocumentMeta([
    { name: "description", content: "Newsletter dashboard - manage your newsletters" },
    { name: "robots", content: "noindex" }
  ]);

  const [filters, setFilters] = useState<Omit<SearchNewsParams, 'limit'>>({
    page: 1,
    category: undefined,
    period: undefined,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['news', filters],
    queryFn: () => getNews({ ...filters, limit: 10 }),
    retry: 3,
  });

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ 
      ...prev, 
      category: category || undefined, 
      page: 1 
    }));
  };

  const handlePeriodChange = (period: string) => {
    setFilters(prev => ({ 
      ...prev, 
      period: (period as 'day' | 'week' | 'month') || undefined, 
      page: 1 
    }));
  };

  const handleClearFilters = () => {
    setFilters({ page: 1, category: undefined, period: undefined });
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden">
          <div className="p-6 pb-0">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-800">
              Últimas Notícias
            </h1>
            <p className="text-gray-600 mb-6">
              Acompanhe as últimas notícias e mantenha-se informado sobre os assuntos mais relevantes
            </p>
          </div>
          
          <NewsFilters
            category={filters.category}
            period={filters.period}
            onCategoryChange={handleCategoryChange}
            onPeriodChange={handlePeriodChange}
            onClearFilters={handleClearFilters}
          />
        </div>

      {error && (
        <div className="mb-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erro ao carregar as notícias. Tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {isLoading ? (
        <div className="bg-white/30 rounded-xl border border-white/20 shadow-lg backdrop-blur-sm overflow-hidden mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={`p-8 border-b border-gray-200 ${
              index % 2 === 0 ? 'bg-gradient-to-r from-white to-blue-50/30' : 'bg-gradient-to-r from-purple-50/30 to-white'
            }`}>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="p-6 rounded-xl bg-gray-100 animate-pulse">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : data?.news && data.news.length > 0 ? (
        <>
          <div className="bg-white/30 rounded-xl border border-white/20 shadow-lg backdrop-blur-sm overflow-hidden mb-8">
            {data.news.map((news, index) => (
              <NewsCardAlternate key={news.id} news={news} index={index} />
            ))}
          </div>

          <NewsPagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Nenhuma notícia encontrada com os filtros selecionados.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}