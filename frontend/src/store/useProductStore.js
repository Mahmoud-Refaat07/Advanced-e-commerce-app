import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/products", productData);
      console.log(response);

      set((state) => ({
        products: [...state.products, response.data.product],
        loading: false,
      }));

      toast.success("New Product Created");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },

  getProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "Failed to fetch products");
      set({ loading: false });
    }
  },

  getProductByCategory: async (category) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.get(`products/category/${category}`);
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error.response.data.message);
      toast.error(
        error.response.data.message || "Failed to fetch product by category"
      );
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${productId}`);

      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
        loading: false,
      }));

      toast.success("Product Deleted Successfully");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed Deleting Product");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.patch(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "Failed to switch featured");
    }
  },
}));
