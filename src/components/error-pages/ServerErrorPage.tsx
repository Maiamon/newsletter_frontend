import { Button } from "@/components/ui/button";
import { ServerCrash, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router";
import { useDocumentTitle } from "@/lib/document-head";

export function ServerErrorPage() {
  const navigate = useNavigate();
  
  useDocumentTitle("Erro interno do servidor");

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Ícone grande */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-6 rounded-full">
            <ServerCrash className="h-16 w-16 text-red-600" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        
        {/* Subtítulo */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Erro interno do servidor
        </h2>
        
        {/* Descrição */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Algo deu errado do nosso lado. Nossos desenvolvedores foram notificados 
          e estão trabalhando para resolver o problema.
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleRefresh}
            className="gap-2"
            size="lg"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </Button>
          
          <Button 
            onClick={handleGoHome}
            variant="outline" 
            className="gap-2"
            size="lg"
          >
            <Home className="h-4 w-4" />
            Ir para Dashboard
          </Button>
        </div>

        {/* Informação adicional */}
        <div className="mt-12 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-sm text-orange-800">
            <strong>Erro temporário:</strong> Se o problema persistir, 
            entre em contato com o suporte técnico.
          </p>
        </div>
      </div>
    </div>
  );
}