import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "../../validations/passwordResetSchema";

import { forgotPassword } from "../../services/authService";

type BackendError = {
  error?: string;
};

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      const response = await forgotPassword(data.email);

      toast.success(response.message);

      setTimeout(() => {
        navigate("/verify-reset-otp", {
          state: {
            email: data.email,
          },
        });
      }, 1000);
    } catch (error: unknown) {
      if (isAxiosError<BackendError>(error)) {
        toast.error(
          error.response?.data?.error ??
            "Unable to process your request. Please try again."
        );
      } else {
        toast.error(
          "Unable to process your request. Please try again."
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full space-y-5"
    >
      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="forgot-password-email"
          className="block text-[13px] font-medium text-[#e5e5e5]"
        >
          Email
        </label>

        <input
          id="forgot-password-email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? "forgot-password-email-error" : undefined
          }
          autoComplete="email"
          className="w-full rounded-[10px] border
          border-white/[0.07] bg-[#242424] px-3 py-3
          text-[13px] text-white outline-none transition
          placeholder:text-[#666666]
          focus:border-white/[0.14] focus:bg-[#272727]
          disabled:cursor-not-allowed disabled:opacity-60"
        />

        {errors.email && (
          <p
            id="forgot-password-email-error"
            className="text-xs text-red-300"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[10px] bg-white px-4 py-3
        text-[13px] font-medium text-black transition
        hover:bg-[#e8e8e8] focus:outline-none
        focus:ring-2 focus:ring-white/20
        disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting
          ? "Sending code..."
          : "Send reset code"}
      </button>
    </form>
  );
}