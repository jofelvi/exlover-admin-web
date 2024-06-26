import axios from "axios";

//const API_URL = 'https://localhost:7154/api/'
const API_URL = "https://ex-lover.azurewebsites.net/api/";
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    //ToDO: change value token for real
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
