import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, Newspaper, User, LogOut, X } from "lucide-react";
import { AuthService } from "@/lib/auth-service";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";

interface MobileMenuProps {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
}

export function MobileMenu({ isAuthenticated, user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      toast.success('Logout realizado com sucesso!');
      navigate('/sign-in', { replace: true });
      setIsOpen(false);
    } catch (error) {
      console.error('Erro no logout:', error);
      AuthService.clearAuth();
      navigate('/sign-in', { replace: true });
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden bg-white/30 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Abrir menu</span>
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu lateral */}
      <div className={`
        fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] bg-white border-l border-gray-200 shadow-2xl
        transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
              <Newspaper className="h-4 w-4" />
            </div>
            <span className="font-semibold text-gray-800">Newsletter</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/50 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-4 bg-gradient-to-b from-blue-50 to-indigo-50">
          {isAuthenticated && user && (
            <>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200 shadow-md">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-800">{user.name}</span>
                  <span className="text-xs text-gray-600">{user.email}</span>
                </div>
              </div>
              
              <Separator className="border-gray-200" />
              
              <nav className="space-y-2">
                <a 
                  href="/dashboard" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-300 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                    <Newspaper className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Dashboard</span>
                </a>
                
                <a 
                  href="/profile" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-300 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Perfil</span>
                </a>
              </nav>
              
              <Separator className="border-gray-200" />
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 p-3 h-auto bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-md"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Sair</span>
              </Button>
            </>
          )}
          
          {!isAuthenticated && (
            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300" 
                onClick={() => setIsOpen(false)}
              >
                <a href="/sign-in">Entrar</a>
              </Button>
              <Button 
                variant="outline" 
                asChild 
                className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800 transition-all duration-300 shadow-md" 
                onClick={() => setIsOpen(false)}
              >
                <a href="/sign-up">Cadastrar</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}