import axios from "axios";
import { getToken, logout } from "./auth";

const api = axios.create({
  baseURL: "https://api.requihub.com.br",
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
    if (error?.response?.status === 500 && error?.response?.data.message.includes("JWT" || "jwt") ) {
      logout();
      window.location.reload();
      alert("Sua sessão expirou");
    }
    else if(error?.response?.status === 500){
      window.location.reload();
      alert("Error interno do servidor");
    }else{
      alert("Error interno do servidor");
    }
    return Promise.reject(error);
  }
);

export default api;
