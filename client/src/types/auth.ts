export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SignupResponse = {
  user: AuthUser;
};

export type SigninResponse = {
  message: string;
  user: AuthUser;
};

export type CurrentUserResponse = {
  user: AuthUser;
};
