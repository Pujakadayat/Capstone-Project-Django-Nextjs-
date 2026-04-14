import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN } from "./constants/constants";
import { Role } from "@/types/user";
import { jwtDecode } from "jwt-decode";

const PUBLIC_ROUTE = ["/", "/login", "/register", "/products"];

const ROLE_ROUTES: Record<string, Role[]> = {
  "/dashboard/analytics": [Role.ADMIN],
  "/dashboard/users": [Role.ADMIN],

  "/dashboard/inventory": [Role.STAFF, Role.ADMIN],
  "/dashboard/products": [Role.STAFF, Role.ADMIN],
  "/dashboard/orders": [Role.STAFF],
  "/dashboard": [Role.ADMIN, Role.STAFF],
  "/cart": [Role.CUSTOMER],
  "/orders": [Role.CUSTOMER],
};


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ACCESS_TOKEN)?.value;
  let role: Role | undefined;

  if (PUBLIC_ROUTE.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const payload = jwtDecode<{ role: Role }>(token);
    role = payload.role;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const allowedRoles = ROLE_ROUTES[pathname];
  if (allowedRoles && !allowedRoles.includes(role)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
