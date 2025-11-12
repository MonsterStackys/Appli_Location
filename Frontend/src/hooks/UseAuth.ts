// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authService } from '../lib/services/authService';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?:string;
  type: 'particulier' | 'agence';
  description?: string;
  whatsapp?: string;
  
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const storedUser = authService.getStoredUser();
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: User, token: string) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    checkAuth
  };
}