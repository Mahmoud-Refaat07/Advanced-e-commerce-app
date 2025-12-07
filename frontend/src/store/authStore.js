import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const URI = "http://localhost:5000/api";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: null,

  signup: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${URI}/auth/signup`, data);
      set({ user: response.data, isLoading: false });
      toast.success("User created successfully");
      return { success: true };
    } catch (error) {
      console.log("Signup error", error.response.data.message);
      toast.error(error.response.data.message);
      return { success: false };
    }
  },

  login: async (data) => {
    set({ isLoading: true });

    try {
      const response = await axios.post(`${URI}/auth/login`, data);
      set({ user: response.data, isLoading: false });
      toast.success("User Logged successfully");
      return { success: true };
    } catch (error) {
      console.log("Login failed:", error.response.data.message);
      toast.error(error.response.data.message);
      return { success: false };
    }
  },
}));

export default useAuthStore;
