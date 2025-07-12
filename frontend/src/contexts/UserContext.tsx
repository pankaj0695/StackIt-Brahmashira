import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: "user" | "admin";
  bio?: string;
  followers?: number;
  following?: number;
  isBanned?: boolean;
  createdAt?: string;
  notificationsIds?: string[];
}

interface UserContextType {
  user: User | null;
  register: (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => Promise<string>;
  login: (data: { email: string; password: string }) => Promise<string>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const register = async (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      setUser(result.user);
      return "Registration successful!";
    } else {
      throw new Error(result.error || "Registration failed");
    }
  };

  const login = async (data: { email: string; password: string }) => {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      setUser(result.user);
      return "Login successful!";
    } else {
      throw new Error(result.error || "Login failed");
    }
  };

  const logout = async () => {
    await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
    });
    setUser(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
