import { create } from "zustand";
import type { UserProfile } from "../types";

type AuthState = {
  token: string | null;
  user: UserProfile | null;
  initialized: boolean;
  setAuth: (token: string, user: UserProfile) => void;
  setUser: (user: UserProfile) => void;
  logout: () => void;
  setInitialized: (initialized: boolean) => void;
};

const TOKEN_KEY = "easy-english-token";

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  user: null,
  initialized: false,
  setAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token, user });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, user: null, initialized: true });
  },
  setInitialized: (initialized) => set({ initialized })
}));
