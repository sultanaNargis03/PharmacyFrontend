import React, { createContext, useState, useEffect } from "react";
import { isLoggedIn } from "./Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = (callback) => {
    setIsAuthenticated(false);

    if (callback) callback();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
