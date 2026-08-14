import { useState } from "react";
import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import {useNavigate } from "react-router-dom";

import { signupSchema, type SignupInput } from "../../validations/authSchema";
import { signup } from "../../services/authService";


export default function SignupForm() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  
  const [backendError, setBackendError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignupInput) => {
    setBackendError("");
    setIsLoading(true);

    try{
      await signup(data);

      navigate("/verify-email",{
        state:{
          email: data.email,
        }
      })

    }catch(error: unknown){
      if (isAxiosError(error)) {
        const message = error.response?.data?.error;

        setBackendError(
          message ?? "Unable to create your account. Please try again."
        );
      }else{
        setBackendError("Unable to create your account. Please try again.");
      }
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full space-y-5"
    >
      {/* Backend error */}
      {backendError && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {backendError}
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="signup-name"
          className="block text-[13px] font-medium text-[#e5e5e5]"
        >
          Name
        </label>
          
        <input
          id="signup-name"
          type="text"
          placeholder="Your name"
          {...register("name")}
          disabled={isLoading}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name ? "signup-name-error" : undefined
          }
          autoComplete="name"
          className="  w-full  rounded-[10px]  border  border-white/[0.07]  bg-[#242424]  px-3  py-3 
           text-[13px]  text-white  outline-none  transition  placeholder:text-[#666666]  
           focus:border-white/[0.14]  focus:bg-[#272727]  disabled:cursor-not-allowed  disabled:opacity-60"
        />
      
        {errors.name && (
          <p
            id="signup-name-error"
            className="text-xs text-red-300"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="signup-email"
          className="block text-[13px] font-medium text-[#e5e5e5]"
        >
          Email
        </label>

        <input
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          disabled={isLoading}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? "signup-email-error" : undefined
          }
          autoComplete="email"
          className="  w-full  rounded-[10px]  border  border-white/[0.07]  bg-[#242424]  px-3  py-3
            text-[13px]  text-white  outline-none  transition  placeholder:text-[#666666] 
             focus:border-white/[0.14]  focus:bg-[#272727]  disabled:cursor-not-allowed  disabled:opacity-60"
        />

        {errors.email && (
          <p
            id="signup-email-error"
            className="text-xs text-red-300"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="signup-password"
          className="block text-[13px] font-medium text-[#e5e5e5]"
        >
          Password
        </label>

        <input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          disabled={isLoading}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? "signup-password-error" : undefined
          }
          autoComplete="new-password"
          className="  w-full  rounded-[10px]  border  border-white/[0.07]  bg-[#242424]  px-3  py-3 
           text-[13px]  text-white  outline-none  transition  placeholder:text-[#666666]  
           focus:border-white/[0.14]  focus:bg-[#272727]  disabled:cursor-not-allowed  disabled:opacity-60"
        />

        {errors.password && (
          <p
            id="signup-password-error"
            className="text-xs text-red-300"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="  w-full  rounded-[10px]  bg-white  px-4  py-3  text-[13px]  font-medium  
        text-black  transition  hover:bg-[#e8e8e8]  focus:outline-none  focus:ring-2  focus:ring-white/20 
         disabled:cursor-not-allowed  disabled:opacity-50"
      >
        {isLoading ? "Creating account..." : "Sign up"}
      </button>
    </form>
  );
}