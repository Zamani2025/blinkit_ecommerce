const BaseURL = "http://localhost:5000";
import axios from "axios";

const Axios = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default Axios;
