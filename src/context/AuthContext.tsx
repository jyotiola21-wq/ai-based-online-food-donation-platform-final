import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole, name?: string) => void;
  register: (userData: Partial<User> & { email: string; role: UserRole; name: string }) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'food_donation_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [currentUser]);

  const login = (email: string, role: UserRole, name?: string) => {
    const displayName = name || email.split('@')[0] || (role === 'donor' ? 'Sample Donor' : role === 'ngo' ? 'Sample NGO' : 'Sample Volunteer');
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: displayName,
      email,
      role,
      organizationName: role === 'ngo' ? 'Registered NGO Partner' : undefined,
    };
    setCurrentUser(newUser);
  };

  const register = (userData: Partial<User> & { email: string; role: UserRole; name: string }) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      ...userData,
    };
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      role,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        switchRole,
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
