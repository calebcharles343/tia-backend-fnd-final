import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { UserType } from "../interfaces";

interface UserStore {
  useUser: UserType | null; // Single authenticated user
  setUser: (user: UserType) => Promise<void>;
}

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

export const authStore = create<UserStore>(
  (persist as MyPersist)(
    (set) => ({
      useUser: null, // Default state
      setUser: async (user) => {
        set({ useUser: user });
      },
    }),
    {
      name: "useUser", // Persistent store key
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrated state:", state);
      },
    }
  )
);
