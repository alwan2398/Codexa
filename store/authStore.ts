import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  credits: number;
}

interface AuthStore {
  user: UserData | null;
  isLoaded: boolean;
  setUser: (user: UserData | null) => void;
  setIsLoaded: (loaded: boolean) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoaded: false,
      setUser: (user) => set({ user }),
      setIsLoaded: (isLoaded) => set({ isLoaded }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
