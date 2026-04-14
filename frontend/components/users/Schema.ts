import { z, ZodType } from "zod";

// export const loginSchema = z.object({
//   phone_number: z
//     .string()
//     .min(5, "Min 5 characters")
//     .max(20, "Max 20 characters"),
//   password: z.string().min(5, "Min 5 characters").max(20, "Max 20 characters"),

// });

// export const registerSchema = z.object({
//   phone_number: z
//     .string()
//     .min(5, "Min 5 characters")
//     .max(20, "Max 20 characters"),
//   password: z.string().min(5, "Min 5 characters").max(20, "Max 20 characters"),
//   full_name: z
//     .string()
//     .min(10, "Fullname should be of at least 2 character")
//     .max(50),
//   email: z.string().email(),
//   confirmPassword: z.string().min(5).max(20),
// });

export const loginSchema = z.object({
  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    phone_number: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    full_name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50),
    email: z.string().email().optional().or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    { message: "Passwords do not match", path: ["confirmPassword"] }, // ← missing this!
  );
