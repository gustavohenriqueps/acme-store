"use client";

import { AuthContextProps, User } from "@/data/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Criação do contexto
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Constantes de chave do localStorage
  const USERS_KEY = "auth_users";
  const CURRENT_USER_KEY = "auth_current_user";

  // Verifica se já há usuário logado ao carregar o app
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário atual:", error);
    }
  }, []);

  // Cadastro de novo usuário
  function signup(newUser: {
    username: string;
    email: string;
    password: string;
  }): boolean {
    try {
      const users = JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      ) as User[];

      const emailExists = users.some((u) => u.email === newUser.email);
      if (emailExists) return false; // E-mail já cadastrado

      // Simula uma hash da senha com base64
      const passwordHash = btoa(newUser.password);
      const userToStore: User = {
        sessionId: uuidv4(),
        username: newUser.username,
        email: newUser.email,
        passwordHash,
      };

      users.push(userToStore);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Login automático após cadastro
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore));
      setUser(userToStore);

      return true;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return false;
    }
  }

  // Autenticação de login
  function login(email: string, password: string): boolean {
    try {
      const users = JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      ) as User[];

      const passwordHash = btoa(password);
      const foundUser = users.find(
        (u) => u.email === email && u.passwordHash === passwordHash
      );

      if (foundUser) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  }

  // Logout
  function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
