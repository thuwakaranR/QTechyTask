import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const loadAuthData = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = jwtDecode(token);
          setAuth({ token, user });
        } catch (error) {
          console.error('Failed to decode token:', error);
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
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    navigate('/'); // Redirect to login page
  };
  

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
