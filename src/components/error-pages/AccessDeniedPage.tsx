import { Button } from "@/components/ui/button";
import { ShieldX, LogIn, Home } from "lucide-react";
import { useNavigate } from "react-router";
import { useDocumentTitle } from "@/lib/document-head";

export function AccessDeniedPage() {
  const navigate = useNavigate();
  
  useDocumentTitle("Acesso negado");

  const handleLogin = () => {
    navigate('/sign-in');
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Ícone grande */}
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-6 rounded-full">
            <ShieldX className="h-16 w-16 text-yellow-600" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">403</h1>
        
        {/* Subtítulo */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Acesso negado
        </h2>
        
        {/* Descrição */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Você não tem permissão para acessar esta página. 
          Faça login com uma conta autorizada ou entre em contato com o administrador.
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleLogin}
            className="gap-2"
            size="lg"
          >
            <LogIn className="h-4 w-4" />
            Fazer Login
          </Button>
          
          <Button 
            onClick={handleGoHome}
            variant="outline" 
            className="gap-2"
            size="lg"
          >
            <Home className="h-4 w-4" />
            Página Inicial
          </Button>
        </div>

        {/* Informação adicional */}
        <div className="mt-12 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Precisa de acesso?</strong> Entre em contato com o administrador 
            do sistema para solicitar as permissões necessárias.
          </p>
        </div>
      </div>
    </div>
  );
}