import { RegisterRequest, Role } from "../types/user";
import {
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  ROLE_KEY,
  USER_ID,
  COOKIE_OPTIONS,
} from "@/constants/constants";
import Cookies from "js-cookie";
import api from "./api";
import { LoginRequest, LoginResponse } from "@/types/user";

export const getToken = () => Cookies.get(ACCESS_TOKEN);
export const getRole = () => Cookies.get(ROLE_KEY) as Role;
export const getUserId = () => Cookies.get(USER_ID);
export const IsLoggedIn = () => !!Cookies.get(ACCESS_TOKEN);

const clearAuth = () => {
  [ACCESS_TOKEN, REFRESH_TOKEN, ROLE_KEY, USER_ID].forEach((key) =>
    Cookies.remove(key),
  );
};

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(`api/v1/users/login/`, credentials);

  Cookies.set(ACCESS_TOKEN, res.data.access, COOKIE_OPTIONS);
  Cookies.set(REFRESH_TOKEN, res.data.refresh, {
    ...COOKIE_OPTIONS,
    expires: 7,
  });
  Cookies.set(ROLE_KEY, res.data.role, COOKIE_OPTIONS);
  Cookies.set(USER_ID, String(res.data.user_id), COOKIE_OPTIONS);
  return res.data;
};

export const register = async (
  credentials: RegisterRequest,
): Promise<boolean> => {
  await api.post(`api/v1/users/`, credentials);
  return true;
};

export const logout = async () => {
  const refresh = Cookies.get(REFRESH_TOKEN);
  if (refresh) {
    await api.post(`api/v1/users/logout/`, { refresh_token: refresh });
  }
  clearAuth();
  window.location.href = "/login";
};
