import axios from "axios";
import { getToken, logout } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common[
        "Content-Type"
      ] = `application/x-www-form-urlencoded`;
      axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 500) {
      logout();
      window.location.reload();
      alert("Sua sessão expirou");
    }
    return Promise.reject(error);
  }
);

export default api;
