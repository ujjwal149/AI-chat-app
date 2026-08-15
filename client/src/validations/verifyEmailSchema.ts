import { z } from "zod";

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be a 6-digit code"),
});

export type VerifyEmailInput = z.infer<
  typeof verifyEmailSchema
>; 