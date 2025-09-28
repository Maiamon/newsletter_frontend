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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo e Nome */}
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground p-2 h-auto"
            asChild
          >
            <a href="/dashboard">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
                <Newspaper className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight">Newsletter</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
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
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              )}
              
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              
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