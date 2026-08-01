import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('username');
    const savedRole = localStorage.getItem('role');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
      setRole(savedRole);
    }
  }, []);

  const login = (username, authToken, userRole) => {
    setUser(username);
    setToken(authToken);
    setRole(userRole);
    localStorage.setItem('token', authToken);
    localStorage.setItem('username', username);
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  const isAdmin = () => role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
