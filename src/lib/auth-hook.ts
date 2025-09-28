import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthService } from './auth-service';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Primeiro, verifica se há token
        if (!AuthService.hasToken()) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verifica se o token está expirado (JWT)
        if (AuthService.isTokenExpired()) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verifica se o token é válido no servidor
        const isValid = await AuthService.isAuthenticated();
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error('❌ useAuth - Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const redirectToLogin = () => {
    console.log('🔄 Auth - Redirecionando para login');
    navigate('/sign-in', { replace: true });
  };

  const redirectToDashboard = () => {
    console.log('🔄 Auth - Redirecionando para dashboard');
    navigate('/dashboard', { replace: true });
  };

  return {
    isAuthenticated,
    isLoading,
    redirectToLogin,
    redirectToDashboard,
    user: AuthService.getUser(),
  };
}