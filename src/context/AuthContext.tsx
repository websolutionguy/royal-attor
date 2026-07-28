import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'royal_attar_admin_token';
const USER_KEY = 'royal_attar_admin_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore and verify auth session on mount
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/admin/verify', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (response.data?.authenticated) {
          setUser(response.data.user);
          localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        } else {
          // Fallback if client token exists and matches admin format
          if (storedToken.startsWith('token-admin-')) {
            const fallbackUser: AdminUser = {
              id: 'admin-1',
              email: 'admin@gmail.com',
              name: 'Royal Attar Admin',
              role: 'admin',
            };
            setUser(fallbackUser);
          } else {
            logout();
          }
        }
      } catch (err) {
        // Fallback for purely client environment if backend endpoint fails
        if (storedToken.startsWith('token-admin-')) {
          const fallbackUser: AdminUser = {
            id: 'admin-1',
            email: 'admin@gmail.com',
            name: 'Royal Attar Admin',
            role: 'admin',
          };
          setUser(fallbackUser);
        } else {
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Attempt backend API call first
      let authUser: AdminUser;
      let authToken: string;

      try {
        const response = await axios.post('/api/admin/login', { email, password });
        if (response.data.success) {
          authUser = response.data.user;
          authToken = response.data.token;
        } else {
          return { success: false, error: response.data.error || 'Login failed' };
        }
      } catch (apiError: any) {
        // Fallback verification against local JSON rule requirement
        if (email.toLowerCase() === 'admin@gmail.com' && password === 'Admin!@#007') {
          authUser = {
            id: 'admin-1',
            email: 'admin@gmail.com',
            name: 'Royal Attar Admin',
            role: 'admin',
          };
          authToken = `token-admin-1-${Date.now()}`;
        } else {
          return {
            success: false,
            error: apiError.response?.data?.error || 'Invalid email or password',
          };
        }
      }

      setUser(authUser);
      setToken(authToken);
      localStorage.setItem(TOKEN_KEY, authToken);
      localStorage.setItem(USER_KEY, JSON.stringify(authUser));

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'An error occurred during login' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
