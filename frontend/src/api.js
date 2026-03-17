import axios from "axios";

const api = axios.create({
    baseURL: 
        import.meta.env.MODE === "development"
        ? "http://localhost:5000"
        : "https://pet-grooming-neon.vercel.app",
    withCredentials: true,  
})

// Request interceptor: attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auto-logout or error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — maybe token expired?");
      // Clear token and redirect to login
      localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;