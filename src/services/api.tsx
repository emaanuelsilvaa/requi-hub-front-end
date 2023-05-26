import axios from "axios";
import { getToken } from "./auth";
import {useNavigate } from 'react-router-dom';

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
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const navigate = useNavigate();
    const config = error?.config;
    console.log("===="+"response interceptor")
    if (error?.response?.status === 500) {
      config.sent = true;
      navigate('/login')
      console.log("===="+"response interceptor")

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default api;