import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/ui/logout-button";
import { Separator } from "@/components/ui/separator";
import { MainNavigation } from "./MainNavigation";
import { MobileMenu } from "./MobileMenu";
import { Newspaper, User } from "lucide-react";
import { AuthService } from "@/lib/auth-service";
import { useEffect, useState } from "react";

export function Header() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const userData = AuthService.getUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-50/95 via-indigo-50/95 to-purple-50/95 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-blue-50/80 supports-[backdrop-filter]:via-indigo-50/80 supports-[backdrop-filter]:to-purple-50/80 border-white/20 shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo e Nome */}
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:bg-white/50 hover:text-gray-800 p-2 h-auto transition-all duration-300 rounded-lg"
            asChild
          >
            <a href="/dashboard">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                <Newspaper className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight text-gray-800">Newsletter</span>
                <span className="text-xs text-gray-600">Dashboard</span>
              </div>
            </a>
          </Button>
          
          {/* Navegação principal */}
          {isAuthenticated && <MainNavigation />}
        </div>

        {/* Informações do usuário e ações */}
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              {user && (
                <div className="hidden sm:flex items-center gap-3 text-sm bg-white/30 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{user.name}</span>
                    <span className="text-xs text-gray-600">{user.email}</span>
                  </div>
                </div>
              )}
              
              <Separator orientation="vertical" className="h-8 hidden sm:block border-white/30" />
              
              <LogoutButton />
            </>
          )}
          
          {/* Menu Mobile */}
          <MobileMenu isAuthenticated={isAuthenticated} user={user} />
        </div>
      </div>
    </header>
  );
}