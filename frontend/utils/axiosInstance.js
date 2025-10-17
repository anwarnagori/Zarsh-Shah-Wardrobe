import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
