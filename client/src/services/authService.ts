import api from "../lib/axios";

import type {SigninInput, SignupInput,} from "../validations/authSchema";
import type {CurrentUserResponse, SigninResponse, SignupResponse,} from "../types/auth";


//-------------signup----------------//
export async function signup(
  input: SignupInput
): Promise<SignupResponse> {
  const response = await api.post<SignupResponse>("/auth/signup", {
    name: input.name,
    email: input.email,
    password: input.password,
  });

  return response.data;
}


//-----------verifyEmail----------------//
export async function verifyEmail(
  email: string,
  otp: string
): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>(
    "/auth/verify-email",
    {
      email,
      otp,
    }
  );

  return response.data;
}

//-----------resendVerificationEmail----------------//
export async function resendVerificationEmail(
  email: string
): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>(
    "/auth/resend-email-verification",
    {
      email,
    }
  );

  return response.data;
}

//-----------forgot Password-----------//
export async function forgotPassword(
  email: string
): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
}

//-----------verifyResetOtp----------------//
export async function verifyResetOtp(
  email: string,
  otp: string
): Promise<{ resetToken: string }> {
  const response = await api.post<{ resetToken: string }>(
    "/auth/verify-reset-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
}

//-----------resetPassword----------------//
export async function resetPassword(
  resetToken: string,
  newPassword: string
): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>(
    "/auth/reset-password",
    {
      resetToken,
      newPassword,
    }
  );

  return response.data;
}

//-----------signin----------------//
export async function signin(
  input: SigninInput
): Promise<SigninResponse> {
  const response = await api.post<SigninResponse>("/auth/signin", {
    email: input.email,
    password: input.password,
  });

  return response.data;
}

//-----------getCurrentUser----------------//
export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await api.get<CurrentUserResponse>("/auth/me");

  return response.data;
}

//-----------logout----------------//
export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}