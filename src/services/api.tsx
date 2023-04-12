import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use(config => {
  const token = getToken();
  console.log(token);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Content-Type'] = `application/x-www-form-urlencoded`;
    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    config.headers = {
      'Authorization': `Bearer ${token}`,
    };
    console.log("configgggggg "+config.headers);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;