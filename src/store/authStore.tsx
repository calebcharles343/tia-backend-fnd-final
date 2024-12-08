import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { login, signup } from "../services/apiAuth";
import Cookies from "js-cookie";
import { Root } from "../interfaces";

interface UserStore {
  user: Root | null; // Single authenticated user
  isLoading: boolean;
  errMessage: string;
  signin: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  clearError: () => void;
}

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

export const authStore = create<UserStore>(
  (persist as MyPersist)(
    (set) => ({
      user: null, // Default user state
      isLoading: false,
      errMessage: "",
      signin: async (email, password) => {
        set({ isLoading: true, errMessage: "" });

        try {
          const response = await login(email, password);

          if (response?.data?.token) {
            // Save JWT to cookies
            Cookies.set("jwt", response.data.token, { expires: 7 });
            set({ user: response.data });
          } else {
            set({
              errMessage:
                response?.message || "Login failed. Please try again.",
            });
          }
        } catch (error) {
          console.error("Signin failed", error);
          set({
            errMessage: "An error occurred during sign-in. Please try again.",
          });
        } finally {
          set({ isLoading: false });
        }
      },
      signup: async (name, email, password, confirmPassword) => {
        set({ isLoading: true, errMessage: "" });

        try {
          const response = await signup(name, email, password, confirmPassword);

          if (response?.data) {
            set({ user: response.data });
          } else {
            set({
              errMessage:
                response?.message || "Signup failed. Please try again.",
            });
          }
        } catch (error) {
          console.error("Signup failed", error);
          set({
            errMessage: "An error occurred during sign-up. Please try again.",
          });
        } finally {
          set({ isLoading: false });
        }
      },
      clearError: () => set({ errMessage: "" }),
    }),
    { name: "user" } // Persistent store key
  )
);
