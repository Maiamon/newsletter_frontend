import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function NewsPagination({ currentPage, totalPages, onPageChange }: NewsPaginationProps) {
  const getVisiblePages = () => {
    const delta = 2; // Mostrar mais páginas ao redor da atual
    const range = [];
    const rangeWithDots = [];

    // Se tivermos poucas páginas, mostrar todas
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    // Sempre mostrar a primeira página
    rangeWithDots.push(1);

    // Calcular o range ao redor da página atual
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // Adicionar ... se necessário após a primeira página
    if (start > 2) {
      rangeWithDots.push('...');
    }

    // Adicionar páginas do range
    for (let i = start; i <= end; i++) {
      rangeWithDots.push(i);
    }

    // Adicionar ... se necessário antes da última página
    if (end < totalPages - 1) {
      rangeWithDots.push('...');
    }

    // Sempre mostrar a última página (se não for a primeira)
    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
                className={`transition-all duration-200 ${
                  currentPage <= 1 
                    ? "pointer-events-none opacity-40 cursor-not-allowed" 
                    : "hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
                }`}
              />
            </PaginationItem>

            {getVisiblePages().map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  <PaginationEllipsis className="text-gray-400" />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(Number(page));
                    }}
                    isActive={currentPage === page}
                    className={`transition-all duration-200 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-gray-800"
                    }`}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    onPageChange(currentPage + 1);
                  }
                }}
                className={`transition-all duration-200 ${
                  currentPage >= totalPages 
                    ? "pointer-events-none opacity-40 cursor-not-allowed" 
                    : "hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        {/* Informações da paginação */}
        <div className="mt-3 text-center">
          <span className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}