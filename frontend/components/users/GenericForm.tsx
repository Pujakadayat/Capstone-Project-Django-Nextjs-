"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { login, register as registerUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { loginSchema, registerSchema } from "./Schema";

function LoginForm({ type = "login" }: { type?: "login" | "register" }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const schema = type === "login" ? loginSchema : registerSchema;
  type LoginFormData = z.infer<typeof loginSchema>;
  type RegisterFormData = z.infer<typeof registerSchema>;
  type UserFormData = LoginFormData | RegisterFormData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
  });

  // const submitData = async (data: UserFormData) => {
  //   try {
  //     setIsLoading(true);
  //     setErrorMessage(null);
  //     if (type === "login") {
  //       const res = await login(data as LoginFormData);
  //       if (res?.access) {
  //         router.refresh();
  //         if (res.role === "ADMIN" || res.role === "STAFF") {
  //           router.push("/dashboard");
  //         } else {
  //           const next = new URLSearchParams(window.location.search).get(
  //             "next",
  //           );
  //           router.push(next ?? "/");
  //         }
  //       }
  //     } else {
  //       const res = await registerUser(data as RegisterFormData);
  //       if (res) {
  //         router.push("/");
  //       }
  //     }
  //   } catch (error) {
  //     setErrorMessage("Invalid credentials. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const submitData = async (data: UserFormData) => {
  try {
    setIsLoading(true);
    setErrorMessage(null);

    if (type === "login") {
      const res = await login(data as LoginFormData);
      if (res?.access) {
        router.refresh();
        if (res.role === "ADMIN" || res.role === "STAFF") {
          router.push("/dashboard");
        } else {
          const next = new URLSearchParams(window.location.search).get("next");
          router.push(next ?? "/");
        }
      }
    } else {
      const { confirmPassword, ...registerData } = data as RegisterFormData;
      // FIX: confirmPassword is frontend-only — never send it to the backend
      await registerUser(registerData);
      router.push("/login");
    }

  } catch (error: any) {
    const msg =
      error?.response?.data?.phone_number?.[0] ||
      error?.response?.data?.email?.[0] ||
      error?.response?.data?.password?.[0] ||
      error?.response?.data?.detail ||
      "Something went wrong. Please try again.";
    setErrorMessage(msg);
  } finally {
    setIsLoading(false);
  }
};
  const inputClass =
    "w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-900 text-sm placeholder-gray-400";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {type === "login" ? "Login to your account" : "Create an account"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label className={labelClass}>Phone Number:</label>
              <input
                type="tel"
                {...register("phone_number")}
                className={inputClass}
              />
              {errors.phone_number && (
                <span className="text-sm text-red-500">
                  {errors.phone_number.message}
                </span>
              )}
            </div>

            {type === "register" && (
              <>
                <div className="grid gap-2">
                  <label className={labelClass}>Full Name:</label>
                  <input
                    type="text"
                    {...register("full_name")}
                    className={inputClass}
                  />
                  {errors.full_name && (
                    <span className="text-sm text-red-500">
                      {errors.full_name.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <label className={labelClass}>Email:</label>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputClass}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </>
            )}

            <div className="grid gap-2">
              <label className={labelClass}>Password:</label>
              <input
                type="password"
                {...register("password")}
                className={inputClass}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {type === "register" && (
              <div className="grid gap-2">
                <label className={labelClass}>Confirm Password:</label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className={inputClass}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            )}

            {errorMessage && (
              <span className="text-sm text-red-500">{errorMessage}</span>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading
                ? "Please wait…"
                : type === "login"
                  ? "Login"
                  : "Register"}
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  );
}

export default LoginForm;
