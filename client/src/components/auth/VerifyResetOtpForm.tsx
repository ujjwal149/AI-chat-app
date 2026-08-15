import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  verifyResetOtpSchema,
  type VerifyResetOtpInput,
} from "../../validations/passwordResetSchema";

import { verifyResetOtp } from "../../services/authService";

type VerifyResetOtpFormProps = {
  email: string;
};

type BackendError = {
  error?: string;
};

export default function VerifyResetOtpForm({
  email,
}: VerifyResetOtpFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<VerifyResetOtpInput>({
    resolver: zodResolver(verifyResetOtpSchema),

    defaultValues: {
      email,
      otp: "",
    },
  });

  const onSubmit = async (data: VerifyResetOtpInput) => {
    try {
      const response = await verifyResetOtp(
        data.email,
        data.otp
      );

      toast.success(
        "Reset code verified successfully."
      );

      navigate("/reset-password", {
        state: {
          resetToken: response.resetToken,
        },
      });
    } catch (error: unknown) {
      if (isAxiosError<BackendError>(error)) {
        toast.error(
          error.response?.data?.error ??
            "Invalid or expired reset code."
        );
      } else {
        toast.error(
          "Unable to verify reset code. Please try again."
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
      {/* OTP */}
      <div className="space-y-2">
        <label
          htmlFor="reset-otp"
          className="block text-[13px] font-medium text-[#e5e5e5]"
        >
          Reset code
        </label>

        <input
          id="reset-otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="000000"
          {...register("otp")}
          disabled={isSubmitting}
          maxLength={6}
          aria-invalid={Boolean(errors.otp)}
          aria-describedby={
            errors.otp
              ? "reset-otp-error"
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
            id="reset-otp-error"
            className="text-xs text-red-300"
          >
            {errors.otp.message}
          </p>
        )}
      </div>

      {/* Verify */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[10px] bg-white px-4 py-3
        cursor-pointer text-[13px] font-medium text-black transition
        hover:bg-[#e8e8e8]
        focus:outline-none focus:ring-2 focus:ring-white/20
        disabled:cursor-not-allowed disabled:opacity-50 "
      >
        {isSubmitting
          ? "Verifying..."
          : "Verify reset code"}
      </button>
    </form>
  );
}