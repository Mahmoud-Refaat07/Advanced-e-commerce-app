import { create } from "zustand";
import axiosInstace from "../lib/axios";
import toast from "react-hot-toast";

const URI = "http://localhost:5000/api";

const useUserStore = create((set, get) => ({
  user: null,
  isLoading: false,
  checkingAuth: true,

  signup: async (data) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstace.post(`/auth/signup`, data);
      set({ user: response.data, isLoading: false });
      toast.success("User created successfully");
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.log("Signup error", error.response.data.message);
      toast.error(error.response.data.message || "An error occurred");
      return { success: false };
    }
  },

  login: async (data) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstace.post(`/auth/login`, data);
      set({ user: response.data, isLoading: false });
      toast.success("User Logged successfully");
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.log("Login failed:", error.response.data.message);
      toast.error(error.response.data.message || "An error occurred");
      return { success: false };
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axiosInstace.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      toast.error("Unauthorized");
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await axiosInstace.post("/auth/logout");
      set({ user: null, isLoading: false });
      toast.success("Logged out");
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.log("Error", error.response.message.data);
      toast.success(error.response.message.data);
      return { success: false };
    }
  },
}));

export default useUserStore;
