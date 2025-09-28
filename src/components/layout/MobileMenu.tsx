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
        className="md:hidden"
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
        fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] bg-background border-l shadow-lg
        transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
              <Newspaper className="h-4 w-4" />
            </div>
            <span className="font-semibold">Newsletter</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-4">
          {isAuthenticated && user && (
            <>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
              
              <Separator />
              
              <nav className="space-y-2">
                <a 
                  href="/dashboard" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Newspaper className="h-4 w-4" />
                  Dashboard
                </a>
              </nav>
              
              <Separator />
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 p-3 h-auto"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </>
          )}
          
          {!isAuthenticated && (
            <div className="space-y-3">
              <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                <a href="/sign-in">Entrar</a>
              </Button>
              <Button variant="outline" asChild className="w-full" onClick={() => setIsOpen(false)}>
                <a href="/sign-up">Cadastrar</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}