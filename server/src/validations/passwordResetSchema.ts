import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
});

export const verifyResetOtpSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be a 6-digit code"),
});

export const resetPasswordSchema = z.object({
  resetToken: z
    .string()
    .min(1, "Reset token is required"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});