import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://advanced-e-commerce-app-production.up.railway.app/api",
  withCredentials: true,
});

export default axiosInstance;
