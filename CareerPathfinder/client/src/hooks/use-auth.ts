import { useState, useEffect } from 'react';
import { authManager, type User, type AuthTokens } from '@/utils/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(authManager.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(authManager.isAuthenticated());

  useEffect(() => {
    const checkAuth = () => {
      setUser(authManager.getUser());
      setIsAuthenticated(authManager.isAuthenticated());
    };

    // Set up a polling mechanism to check for auth changes
    const interval = setInterval(checkAuth, 100);
    return () => clearInterval(interval);
  }, []);

  const login = (tokens: AuthTokens, userData: User) => {
    authManager.setAuth(tokens, userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authManager.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}
