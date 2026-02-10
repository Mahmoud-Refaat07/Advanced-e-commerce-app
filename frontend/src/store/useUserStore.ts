import { create } from "zustand";
import axiosInstance from "../lib/axios.ts";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  checkingAuth: boolean;

  signup: (data: SignupData) => Promise<{ success: boolean }>;
  login: (data: LoginData) => Promise<{ success: boolean }>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<{ success: boolean }>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  checkingAuth: true,

  signup: async (data) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post<User>("/auth/signup", data);
      set({ user: response.data, isLoading: false });
      toast.success("User created successfully");
      return { success: true };
    } catch (error: unknown) {
      set({ isLoading: false });
      const err = error as AxiosError<{ message: string }>;
      console.log("Signup error", err.response?.data?.message ?? err.message);
      toast.error(err.response?.data?.message ?? "An error occurred");
      return { success: false };
    }
  },

  login: async (data) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post<User>("/auth/login", data);
      set({ user: response.data, isLoading: false });
      toast.success("User logged in successfully");
      return { success: true };
    } catch (error: unknown) {
      set({ isLoading: false });
      const err = error as AxiosError<{ message: string }>;
      console.log("Login failed:", err.response?.data?.message ?? err.message);
      toast.error(err.response?.data?.message ?? "An error occurred");
      return { success: false };
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.get<User>("/auth/profile");
      set({ user: response.data, checkingAuth: false });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      set({ checkingAuth: false, user: null });
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, isLoading: false });
      toast.success("Logged out");
      return { success: true };
    } catch (error: unknown) {
      set({ isLoading: false });
      const err = error as AxiosError<{ message: string }>;
      console.log("Logout error:", err.response?.data?.message ?? err.message);
      toast.error(err.response?.data?.message ?? "An error occurred");
      return { success: false };
    }
  },
}));

export default useUserStore;
