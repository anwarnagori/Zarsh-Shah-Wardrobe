import React, { createContext, useContext, useEffect, useState } from "react";
import { loginApi, registerApi, meApi } from "../services/authService";
import { setAuthToken } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }
        const data = await meApi();
        // if your /me returns {user: {...}} adjust accordingly
        setUser(data);
      } catch (err) {
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  const login = async (credentials) => {
    const res = await loginApi(credentials);
    if (res.token) {
      setToken(res.token);
      setUser(res.user || null);
    }
    return res;
  };

  const register = async (payload) => {
    const res = await registerApi(payload);
    if (res.token) {
      setToken(res.token);
      setUser(res.user || null);
    }
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
