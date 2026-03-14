import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "token";
const TOKEN_EXPIRY_KEY = "token_expiry";

export default function useAuth() {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (savedToken && expiry && new Date().getTime() < +expiry) {
      return savedToken;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      return null;
    }
  });

  // Save token and expiry in localStorage
  const login = useCallback((token, expiresInSec = 24 * 3600) => {
    setToken(token);
    localStorage.setItem(TOKEN_KEY, token);
    const expiryTime = new Date().getTime() + expiresInSec * 1000;
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  }, []);

  // Auto logout when token expires
  useEffect(() => {
    if (!token) return;

    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) {
      logout();
      return;
    }
    const timeout = +expiry - new Date().getTime();

    if (timeout <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeout);

    return () => clearTimeout(timer);
  }, [token, logout]);

  return { token, login, logout };
}
