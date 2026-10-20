
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return null;
      }

      const data = await response.json();

      if (!data.success || !data.user) {
        setUser(null);
        return null;
      }

      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Unable to check authentication:", error);
      setUser(null);
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout request failed.");
      }

      setUser(null);
    } catch (error) {
      console.error("Unable to log out:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    let active = true;

    const checkAuthentication = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          if (active) setUser(null);
          return;
        }

        const data = await response.json();

        if (active) {
          setUser(data.success ? data.user : null);
        }
      } catch (error) {
        if (active) setUser(null);
        console.error("Unable to restore login session:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    checkAuthentication();

    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
