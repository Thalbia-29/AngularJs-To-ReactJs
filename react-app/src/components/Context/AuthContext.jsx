import React, { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", username);

      setToken(token);
      setUser(username);
      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return false;
    }
  };

  const register = async (username, password) => {
    try {
      await api.post("/auth/register", { username, password });
      return true;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
