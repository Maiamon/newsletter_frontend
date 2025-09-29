import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AuthService } from "@/lib/auth-service";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      toast.success('Logout realizado com sucesso!');
      navigate('/sign-in', { replace: true });
    } catch (error) {
      console.error('Erro no logout:', error);
      // Mesmo com erro, limpa os dados locais e redireciona
      AuthService.clearAuth();
      navigate('/sign-in', { replace: true });
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLogout}
      className="gap-2 bg-white/30 backdrop-blur-sm border-white/30 text-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-md"
    >
      <LogOut className="h-4 w-4" />
      Sair
    </Button>
  );
}