import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getMeRequest,
} from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const { user } = await getMeRequest();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const register = async (data) => {
    const { user } = await registerRequest(data);
    setUser(user);
    return user;
  };

  const login = async (data) => {
    const { user } = await loginRequest(data);
    setUser(user);
    return user;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  const value = { user, isAuthenticated: Boolean(user), isLoading, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
