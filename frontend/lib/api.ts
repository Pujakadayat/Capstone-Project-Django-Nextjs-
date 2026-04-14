import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  COOKIE_OPTIONS,
  ROLE_KEY,
  USER_ID,
} from "@/constants/constants";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get(REFRESH_TOKEN);

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh/`,
            {
              refresh: refreshToken,
            },
          );

          Cookies.set(ACCESS_TOKEN, data.access, COOKIE_OPTIONS);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          [ACCESS_TOKEN, REFRESH_TOKEN, ROLE_KEY, USER_ID].forEach((key) =>
            Cookies.remove(key),
          );
          redirect("/login");
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
