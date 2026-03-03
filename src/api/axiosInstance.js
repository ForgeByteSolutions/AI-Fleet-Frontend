import axios from "axios";

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
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;