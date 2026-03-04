import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  // Do NOT attach token for login request
  if (token && !config.url.includes("/auth/token")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle global errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is due to a 401 (Unauthorized) response
    if (error.response?.status === 401) {
      if (!error.config.url.includes("/auth/login")) {
        toast.error("Session expired or unauthorized. Please log in again.");
      }
      localStorage.removeItem("token");
      // Optional: you can force reload or emit an event to handle redirect cleanly outside of React components
      // window.location.href = "/login";
    } else if (error.response?.status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else if (error.response?.status >= 500) {
      toast.error("Server encountered an error. Please try again later.");
    } else if (error.message === "Network Error") {
      toast.error("Network error. Please check your internet connection.");
    }

    return Promise.reject(error);
  }
);

export default api;