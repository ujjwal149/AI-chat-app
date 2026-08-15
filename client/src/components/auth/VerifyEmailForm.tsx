import { useState } from "react";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  verifyEmailSchema,
  type VerifyEmailInput,
} from "../../validations/verifyEmailSchema";

import {
  resendVerificationEmail,
  verifyEmail,
} from "../../services/authService";

type VerifyEmailFormProps = {
  email: string;
};

type BackendError = {
  error?: string;
};

export default function VerifyEmailForm({
  email,
}: VerifyEmailFormProps) {
  const navigate = useNavigate();

  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    reset,
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),

    defaultValues: {
      email,
      otp: "",
    },
  });

  const onSubmit = async (data: VerifyEmailInput) => {
    try {
      await verifyEmail(data.email, data.otp);

      toast.success(
        "Email verified successfully. Redirecting to sign in..."
      );

      setTimeout(() => {
        navigate("/signin", {
          state: {
            email: data.email,
          },
        });
      }, 1000);
    } catch (error: unknown) {
      if (isAxiosError<BackendError>(error)) {
        toast.error(
          error.response?.data?.error ??
            "Unable to verify your email. Please try again."
        );
      } else {
        toast.error(
          "Unable to verify your email. Please try again."
        );
      }
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      const response = await resendVerificationEmail(email);

      toast.success(response.message);

      reset({
        email,
        otp: "",
      });
    } catch (error: unknown) {
      if (isAxiosError<BackendError>(error)) {
        toast.error(
          error.response?.data?.error ??
            "Unable to resend verification code."
        );
      } else {
        toast.error(
          "Unable to resend verification code."
        );
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full space-y-5"
    >
      {/* OTP */}
      <div className="space-y-2">
        <label
          htmlFor="verification-otp"
          className="block text-[13px] font-medium text-[#e5e5e5]"
        >
          Verification code
        </label>

        <input
          id="verification-otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="000000"
          {...register("otp")}
          disabled={isSubmitting || isResending}
          maxLength={6}
          aria-invalid={Boolean(errors.otp)}
          aria-describedby={
            errors.otp
              ? "verification-otp-error"
              : undefined
          }
          className="w-full rounded-[10px] border border-white/[0.07]
          bg-[#242424] px-3 py-3 text-center text-lg tracking-[0.5em]
          text-white outline-none transition placeholder:text-[#666666]
          focus:border-white/[0.14] focus:bg-[#272727]
          disabled:cursor-not-allowed disabled:opacity-60"
        />

        {errors.otp && (
          <p
            id="verification-otp-error"
            className="text-xs text-red-300"
          >
            {errors.otp.message}
          </p>
        )}
      </div>

      {/* Verify */}
      <button
        type="submit"
        disabled={isSubmitting || isResending}
        className="w-full rounded-[10px] bg-white px-4 py-3 text-[13px]
        font-medium text-black transition hover:bg-[#e8e8e8]
        focus:outline-none focus:ring-2 focus:ring-white/20
        disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting
          ? "Verifying..."
          : "Verify email"}
      </button>

      {/* Resend */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={isSubmitting || isResending}
          className="text-sm font-medium text-[#8d9bb5] transition
          hover:text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {isResending
            ? "Sending..."
            : "Didn't receive the code? Resend"}
        </button>
      </div>
    </form>
  );
}