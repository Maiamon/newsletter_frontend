import { api } from './axios';

interface User {
  id: string;
  name: string;
  email: string;
}

export class AuthService {
  private static readonly TOKEN_KEY = '@newsletter:token';
  private static readonly USER_KEY = '@newsletter:user';

  /**
   * Verifica se o usuário está autenticado e se o token é válido
   */
  static async isAuthenticated(): Promise<boolean> {
    const token = this.getToken();
    
    if (!token) {
      console.log('🔒 Auth - Nenhum token encontrado');
      return false;
    }

    try {
      // Verifica o token fazendo uma requisição simples para /news
      // Como todas as rotas de notícias são protegidas, isso serve como verificação
      await api.get('/news', { params: { page: 1, limit: 1 } });
      
      console.log('✅ Auth - Token válido');
      return true;
    } catch (error: any) {
      console.error('❌ Auth - Token inválido:', error?.response?.status);
      
      // Se o token é inválido, limpa os dados locais
      if (error?.response?.status === 401) {
        this.clearAuth();
      }
      
      return false;
    }
  }

  /**
   * Verifica se há token sem validar no servidor (verificação rápida)
   */
  static hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtém o token armazenado
   */
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Obtém os dados do usuário armazenados
   */
  static getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    try {
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  /**
   * Salva os dados de autenticação
   */
  static setAuth(token: string, user?: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    console.log('💾 Auth - Dados salvos no localStorage');
  }

  /**
   * Remove todos os dados de autenticação
   */
  static clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    console.log('🗑️ Auth - Dados removidos do localStorage');
  }

  /**
   * Faz logout completo
   */
  static async logout(): Promise<void> {
    this.clearAuth();
    console.log('🚪 Auth - Logout realizado');
  }

  /**
   * Verifica se o token está expirado (se você usar JWT)
   */
  static isTokenExpired(): boolean {
    const token = this.getToken();
    
    if (!token) return true;

    try {
      // Se você usar JWT, pode decodificar e verificar a expiração
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp && payload.exp < currentTime) {
        console.log('⏰ Auth - Token expirado');
        this.clearAuth();
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('⚠️ Auth - Erro ao verificar expiração do token:', error);
      // Se não conseguir decodificar, considera como não expirado
      // A verificação real será feita no servidor
      return false;
    }
  }
}