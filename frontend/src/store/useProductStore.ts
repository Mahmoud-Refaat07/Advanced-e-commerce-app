import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios.ts";
import { AxiosError } from "axios";

export interface Product {
  _id: string;
  name: string;
  price: number;
  category?: string;
  isFeatured?: boolean;
  quantity: number;
  image: string;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  recommedations: Product[];

  setProducts: (products: Product[]) => void;
  createProduct: (productData: Partial<Product>) => Promise<void>;
  getProducts: () => Promise<void>;
  getProductByCategory: (category: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  toggleFeaturedProduct: (productId: string) => Promise<void>;
  getRecommendedProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  recommedations: [],

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post<{ product: Product }>(
        "/products",
        productData,
      );

      set((state) => ({
        products: [...state.products, response.data.product],
        loading: false,
      }));

      toast.success("New Product Created");
    } catch (error: unknown) {
      set({ loading: false });
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data?.message ?? "Failed to create product");
      toast.error(err.response?.data?.message ?? "Failed to create product");
    }
  },

  getProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get<{ products: Product[] }>(
        "/products",
      );
      set({ products: response.data.products, loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data?.message ?? "Failed to fetch products");
      toast.error(err.response?.data?.message ?? "Failed to fetch products");
    }
  },

  getProductByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get<Product[]>(
        `/products/category/${category}`,
      );
      set({ products: response.data, loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      const err = error as AxiosError<{ message: string }>;
      console.log(
        err.response?.data?.message ?? "Failed to fetch product by category",
      );
      toast.error(
        err.response?.data?.message ?? "Failed to fetch product by category",
      );
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${productId}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
        loading: false,
      }));
      toast.success("Product Deleted Successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ loading: false });
      toast.error("Failed Deleting Product");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.patch<{ isFeatured: boolean }>(
        `/products/${productId}`,
      );

      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product,
        ),
        loading: false,
      }));
    } catch (error: unknown) {
      set({ loading: false });
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data?.message ?? "Failed to switch featured");
      toast.error(err.response?.data?.message ?? "Failed to switch featured");
    }
  },

  getRecommendedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get<Product[]>(
        "/products/recommedations",
      );
      set({ recommedations: response.data, loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      const err = error as AxiosError<{ message: string }>;
      console.log(
        err.response?.data?.message ?? "Failed to fetch recommedations",
      );
      toast.error(
        err.response?.data?.message ?? "Failed to fetch recommedations",
      );
    }
  },
}));
