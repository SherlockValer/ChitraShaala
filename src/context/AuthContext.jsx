import { createContext, useContext, useEffect, useState } from "react";
import { userAPI } from "../api/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await userAPI.getUser();
      if (response.status === 200) {
        setUser(response.data?.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
      }
      setError(error.response.data);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await userAPI.logoutUser();
      if (response.status === 200) {
        console.log(response.data?.message);
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    login();
  }, []);

  const value = { user, isAuthenticated, logout, loading, error, authChecked };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
