import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "../../validations/passwordResetSchema";

import { resetPassword } from "../../services/authService";

type ResetPasswordFormProps = {
  resetToken: string;
};

type BackendError = {
  error?: string;
};

export default function ResetPasswordForm({
  resetToken,
}: ResetPasswordFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      const response = await resetPassword(
        resetToken,
        data.newPassword
      );

      toast.success(
        response.message ??
          "Password reset successfully. Redirecting to sign in..."
      );

      setTimeout(() => {
        navigate("/signin");
      }, 1200);
    } catch (error: unknown) {
      if (isAxiosError<BackendError>(error)) {
        toast.error(
          error.response?.data?.error ??
            "Unable to reset password. Please try again."
        );
      } else {
        toast.error(
          "Unable to reset password. Please try again."
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
      {/* New password */}
      <div className="space-y-2">
        <label
          htmlFor="new-password"
          className="block text-[13px] font-medium text-[#e5e5e5]"
        >
          New password
        </label>

        <input
          id="new-password"
          type="password"
          placeholder="Enter new password"
          autoComplete="new-password"
          {...register("newPassword")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.newPassword)}
          aria-describedby={
            errors.newPassword
              ? "new-password-error"
              : undefined
          }
          className="w-full rounded-[10px] border border-white/[0.07]
          bg-[#242424] px-3 py-3 text-sm text-white outline-none
          transition placeholder:text-[#666666]
          focus:border-white/[0.14] focus:bg-[#272727]
          disabled:cursor-not-allowed disabled:opacity-60"
        />

        {errors.newPassword && (
          <p
            id="new-password-error"
            className="text-xs text-red-300"
          >
            {errors.newPassword.message}
          </p>
        )}
      </div>

      {/* Confirm password */}
      <div className="space-y-2">
        <label
          htmlFor="confirm-password"
          className="block text-[13px] font-medium text-[#e5e5e5]"
        >
          Confirm new password
        </label>

        <input
          id="confirm-password"
          type="password"
          placeholder="Confirm new password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={
            errors.confirmPassword
              ? "confirm-password-error"
              : undefined
          }
          className="w-full rounded-[10px] border border-white/[0.07]
          bg-[#242424] px-3 py-3 text-sm text-white outline-none
          transition placeholder:text-[#666666]
          focus:border-white/[0.14] focus:bg-[#272727]
          disabled:cursor-not-allowed disabled:opacity-60"
        />

        {errors.confirmPassword && (
          <p
            id="confirm-password-error"
            className="text-xs text-red-300"
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[10px] bg-white px-4 py-3
        text-[13px] font-medium text-black transition
        hover:bg-[#e8e8e8]
        focus:outline-none focus:ring-2 focus:ring-white/20
        disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting
          ? "Resetting password..."
          : "Reset password"}
      </button>
    </form>
  );
}