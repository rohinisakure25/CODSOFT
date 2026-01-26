import axios from "axios";

const api = axios.create({
  // MUST include /api at the end
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  // Needed for auth cookies (safe even if you use JWT headers)
  withCredentials: true,

  headers: {
    "Content-Type": "application/json"
  }
});

/* -------------------- RESPONSE INTERCEPTOR -------------------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend says unauthorized, reset auth state
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      // Optional: redirect only if not already on login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
