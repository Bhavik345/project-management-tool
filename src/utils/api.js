import axios from "axios";
import { logout } from "../modules/auth/auth-slice";
import { store } from "../../store";

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_API_KEY}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const dispatchLogout = () => {
  store.dispatch(logout());
  localStorage.clear();
  window.location.href = "/login";
};

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response?.status === 401) {
      dispatchLogout();
    }
    return Promise.reject(error);
  }
);

export default authApi;
