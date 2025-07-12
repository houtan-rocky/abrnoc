import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/Task';
import apiService from '../services/api';
import { AuthContext, type AuthContextType } from './AuthContextDef';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const token = apiService.getToken();
    if (token) {
      // You could add a /me endpoint to validate token and get user info
      // For now, we'll just check if token exists
      setUser({ id: '1', username: 'user', email: 'user@example.com', createdAt: '', updatedAt: '' });
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiService.login({ username, password });
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string, confirmPassword: string) => {
    try {
      const response = await apiService.register({ username, email, password, confirmPassword });
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 