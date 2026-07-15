import axios from "axios";
import { getToken } from "../utils/auth.js";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function imageUrl(path) {
  if (!path) return "/placeholder-product.svg";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

export default api;
