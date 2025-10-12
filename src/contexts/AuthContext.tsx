"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { API_CONFIG } from "@/config/api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on app start
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (userData && token) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Set cookies for middleware
        document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
        document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}`; // 30 days

        setUser(data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          signUpWith: "email",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Set cookies for middleware
        document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
        document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}`; // 30 days

        setUser(data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Clear cookies
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    setUser(null);
    router.push("/");
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem("refreshToken");
      if (!refreshTokenValue) return false;

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshToken }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
