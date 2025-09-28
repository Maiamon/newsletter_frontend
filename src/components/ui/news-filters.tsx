import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/categories";

interface NewsFiltersProps {
  category?: string;
  period?: 'day' | 'week' | 'month';
  onCategoryChange: (category: string) => void;
  onPeriodChange: (period: string) => void;
  onClearFilters: () => void;
}

const periods = [
  { value: 'day', label: 'Últimas 24 horas' },
  { value: 'week', label: 'Últimos 7 dias' },
  { value: 'month', label: 'Últimos 30 dias' }
];

export function NewsFilters({ 
  category, 
  period, 
  onCategoryChange, 
  onPeriodChange, 
  onClearFilters 
}: NewsFiltersProps) {
  // Buscar categorias do backend
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 2,
    initialData: [], // Sempre iniciar com array vazio
  });

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex-1">
        <Label htmlFor="category-select" className="text-sm font-medium">
          Categoria
        </Label>
        {categoriesLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : categoriesError ? (
          <Select disabled>
            <SelectTrigger id="category-select" className="text-muted-foreground">
              <SelectValue placeholder="Erro ao carregar categorias" />
            </SelectTrigger>
          </Select>
        ) : (
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger id="category-select">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(categories) && categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex-1">
        <Label htmlFor="period-select" className="text-sm font-medium">
          Período
        </Label>
        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger id="period-select">
            <SelectValue placeholder="Todo o período" />
          </SelectTrigger>
          <SelectContent>
            {periods.map((per) => (
              <SelectItem key={per.value} value={per.value}>
                {per.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="whitespace-nowrap"
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}