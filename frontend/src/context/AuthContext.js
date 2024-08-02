import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    // Load token from localStorage and decode it if it exists
    const loadAuthData = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = jwtDecode(token);
          setAuth({ token, user });
        } catch (error) {
          console.error('Failed to decode token:', error);
          // Optionally, remove invalid token and log out
          localStorage.removeItem('token');
        }
      }
    };

    loadAuthData();
  }, []);

  const login = (token) => {
    try {
      const user = jwtDecode(token);
      localStorage.setItem('token', token);
      setAuth({ token, user });
    } catch (error) {
      console.error('Failed to decode token during login:', error);
      // Optionally, handle the error (e.g., show a message to the user)
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;