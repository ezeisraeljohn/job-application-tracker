import axios from "axios";
import dotenv, { config } from "dotenv";

dotenv.config();
// Create an axios instance with a base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL || "http://localhost:5000/api/v1",
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
