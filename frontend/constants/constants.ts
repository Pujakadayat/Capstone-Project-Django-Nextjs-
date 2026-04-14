export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const ROLE_KEY = "role";
export const USER_ID = "user_id";

export const COOKIE_OPTIONS = {
  // httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  expires: 60 * 60,
  path: "/",
};
