export enum Role {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
}

export interface User {
  id: string;
  full_name: string | null;
  email: string;
  phone_number: string | null;
  role: Role;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user_id: string;
  user_name: string;
  role: string;
}

export interface LoginRequest {
  phone_number: string;
  password: string;
}
export interface RegisterRequest {
  email: string;
  full_name: string;
  phone_number: string;
  password: string;
}
export interface GenericForm {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  image: string | FileList | null;
}
