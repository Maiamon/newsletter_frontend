// Utilitários para gerenciar autenticação
export const auth = {
  getToken: () => localStorage.getItem('@newsletter:token'),
  
  setToken: (token: string) => {
    localStorage.setItem('@newsletter:token', token);
  },
  
  removeToken: () => {
    localStorage.removeItem('@newsletter:token');
  },
  
  isAuthenticated: () => {
    const token = localStorage.getItem('@newsletter:token');
    return !!token;
  }
};