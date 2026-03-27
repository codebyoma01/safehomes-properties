import { useState, useEffect } from "react";
import authService from "../services/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.login({ email, password });
      setUser(data.user);
      return data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password, passwordConfirm) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.register({
        name,
        email,
        password,
        passwordConfirm,
      });
      setUser(data.user);
      return data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};

export default useAuth;
