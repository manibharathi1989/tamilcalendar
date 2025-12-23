import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem('admin_token', newToken);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
