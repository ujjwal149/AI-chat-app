import { useState } from "react";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from "../../stores/authStore";

import { signinSchema, type SigninInput} from "../../validations/authSchema";
import { signin } from "../../services/authService";

import {useLocation, useNavigate } from "react-router-dom";




type BackendError = {
  error?: string;
};

function SigninForm() {
    const navigate = useNavigate();
    const location = useLocation();

  const [backendError, setBackendError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SigninInput>({
      resolver: zodResolver(signinSchema),
      defaultValues: {
        email: location.state?.email ?? "",
      },
    });


    const onSubmit = async (data: SigninInput) => {
        setBackendError("");
        setIsLoading(true);

        try{
            const response = await signin(data);
            setUser(response.user);

            navigate("/");

        }catch(error: unknown){
            if (isAxiosError<BackendError>(error)) {
                const message = error.response?.data?.error;

                setBackendError(
                    message ?? "Unable to sign in. Please try again."
                );
            }else{
                setBackendError("Unable to sign in. Please try again.");
            }
        } finally{
           setIsLoading(false); 
        }
    };

  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-lg space-y-6"
    >
      {backendError && (
        <div
          role="alert"
          className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {backendError}
        </div>
      )}


      <div className="space-y-2">
        <label htmlFor="signin-email" className="block text-sm font-medium text-slate-200">
          Email
        </label>
        <input
          id="signin-email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          disabled={isLoading}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "signin-email-error" : undefined}
          className="w-full rounded-xl border border-white/[0.08] bg-[#222222] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-white/20 focus:bg-[#252525] disabled:cursor-not-allowed disabled:opacity-60"
          autoComplete="email"
        />
        {errors.email && (
          <p id="signin-email-error" className="text-sm text-red-300">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="signin-password" className="block text-sm font-medium text-slate-200">
          Password
        </label>
        <input
          id="signin-password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          disabled={isLoading}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "signin-password-error" : undefined}
          className="w-full rounded-xl border border-white/[0.08] bg-[#222222] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-white/20 focus:bg-[#252525] disabled:cursor-not-allowed disabled:opacity-60"
          autoComplete="current-password"
        />
        {errors.password && (
          <p id="signin-password-error" className="text-sm text-red-300">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition 
        hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/30 
        disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default SigninForm;
