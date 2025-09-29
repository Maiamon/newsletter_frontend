import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCategories, type Category } from '@/api/categories';
import { Badge } from '@/components/ui/badge';
import { Search, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CategorySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedCategoryIds: number[]) => void;
  currentPreferences: number[];
  isLoading?: boolean;
}

export function CategorySelectionModal({ 
  isOpen, 
  onClose, 
  onSave, 
  currentPreferences,
  isLoading = false 
}: CategorySelectionModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>(currentPreferences);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    enabled: isOpen, // Only fetch when modal is open
  });

  // Update selected categories when currentPreferences change
  useEffect(() => {
    setSelectedCategories(currentPreferences);
  }, [currentPreferences]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSave = () => {
    onSave(selectedCategories);
    onClose();
  };

  const handleCancel = () => {
    setSelectedCategories(currentPreferences); // Reset to original state
    onClose();
  };

  // Filter categories based on search term
  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const selectedCount = selectedCategories.length;
  const totalCount = categories?.length || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-white/95 backdrop-blur-sm border-white/30">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Selecionar Categorias
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Escolha as categorias de notícias que mais te interessam. Você pode selecionar quantas quiser.
          </DialogDescription>
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Selection counter */}
          <div className="flex items-center gap-2">
            <Badge variant={selectedCount > 0 ? 'default' : 'secondary'}>
              {selectedCount} de {totalCount} selecionadas
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-96 pr-4">
          {isLoadingCategories ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          ) : filteredCategories.length > 0 ? (
            <div className="space-y-3">
              {filteredCategories.map((category: Category) => {
                const categoryId = category.id;
                const isSelected = selectedCategories.includes(categoryId);
                
                return (
                  <div
                    key={category.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleCategoryToggle(categoryId)}
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={isSelected}
                      onCheckedChange={() => handleCategoryToggle(categoryId)}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Tag className="h-4 w-4 text-gray-500" />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        {category.name}
                      </Label>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Tag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>
                {searchTerm 
                  ? `Nenhuma categoria encontrada para "${searchTerm}"`
                  : 'Nenhuma categoria disponível'
                }
              </p>
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="flex gap-2 pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? 'Salvando...' : `Salvar (${selectedCount} selecionadas)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}