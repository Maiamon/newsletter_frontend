import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDocumentTitle, useDocumentMeta } from "../../../lib/document-head";
import { getNews } from "@/api/news";
import type { SearchNewsParams } from "@/api/news";
import { NewsCard } from "@/components/ui/news-card";
import { NewsFilters } from "@/components/ui/news-filters";
import { NewsPagination } from "@/components/ui/news-pagination";
import { NewsCardSkeleton } from "@/components/ui/news-card-skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LogoutButton } from "@/components/ui/logout-button";

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Newsletter Dashboard</h1>
          <p className="text-muted-foreground">
            Acompanhe as últimas notícias e mantenha-se informado
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="mb-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      ) : data?.news && data.news.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            {data.totalItems} {data.totalItems === 1 ? 'notícia encontrada' : 'notícias encontradas'}
            {(filters.category || filters.period) && ' com os filtros selecionados'}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data.news.map((news) => (
              <NewsCard key={news.id} news={news} />
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
  );
}