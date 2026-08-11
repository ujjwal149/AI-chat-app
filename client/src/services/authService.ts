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