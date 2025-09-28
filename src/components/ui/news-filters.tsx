import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewsFiltersProps {
  category?: string;
  period?: 'day' | 'week' | 'month';
  onCategoryChange: (category: string) => void;
  onPeriodChange: (period: string) => void;
  onClearFilters: () => void;
}

const categories = [
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' }
];

const periods = [
  { value: 'day', label: 'Hoje' },
  { value: 'week', label: 'Esta semana' },
  { value: 'month', label: 'Este mês' }
];

export function NewsFilters({ 
  category, 
  period, 
  onCategoryChange, 
  onPeriodChange, 
  onClearFilters 
}: NewsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex-1">
        <Label htmlFor="category-select" className="text-sm font-medium">
          Categoria
        </Label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger id="category-select">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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