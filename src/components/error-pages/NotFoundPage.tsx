import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useDocumentTitle } from "@/lib/document-head";

export function NotFoundPage() {
  const navigate = useNavigate();
  
  useDocumentTitle("Página não encontrada");

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Ícone grande */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-6 rounded-full">
            <AlertTriangle className="h-16 w-16 text-red-600" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        
        {/* Subtítulo */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Página não encontrada
        </h2>
        
        {/* Descrição */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! A página que você está procurando não existe ou foi movida. 
          Verifique o endereço ou navegue de volta ao dashboard.
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGoHome}
            className="gap-2"
            size="lg"
          >
            <Home className="h-4 w-4" />
            Ir para Dashboard
          </Button>
          
          <Button 
            onClick={handleGoBack}
            variant="outline" 
            className="gap-2"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>

        {/* Informação adicional */}
        <div className="mt-12 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Precisa de ajuda?</strong> Entre em contato com o suporte ou 
            navegue pelo menu principal para encontrar o que procura.
          </p>
        </div>
      </div>
    </div>
  );
}