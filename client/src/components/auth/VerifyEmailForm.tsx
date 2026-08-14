import { useState } from "react";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import {
  resendVerificationEmail,
  verifyEmail,
} from "../../services/authService";

type VerifyEmailFormProps = {
  email: string;
};

export default function VerifyEmailForm({
  email,
}: VerifyEmailFormProps) {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [backendError, setBackendError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleOtpChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setBackendError("");
    setSuccessMessage("");

    if (otp.length !== 6) {
      setBackendError("Please enter the 6-digit verification code.");
      return;
    }

    setIsLoading(true);

    try {
      await verifyEmail(email, otp);

      setSuccessMessage(
        "Email verified successfully. Redirecting to sign in..."
      );

      setTimeout(() => {
        navigate("/signin", {
          state: {
            email,
          },
        });
      }, 1000);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.error;

        setBackendError(
          message ?? "Unable to verify your email. Please try again."
        );
      } else {
        setBackendError(
          "Unable to verify your email. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setBackendError("");
    setSuccessMessage("");
    setIsResending(true);

    try {
      const response = await resendVerificationEmail(email);

      setSuccessMessage(response.message);
      setOtp("");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.error;

        setBackendError(
          message ?? "Unable to resend verification code."
        );
      } else {
        setBackendError(
          "Unable to resend verification code."
        );
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full space-y-5"
    >
      {/* Error */}
      {backendError && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-500/10
          px-4 py-3 text-sm text-red-300"
        >
          {backendError}
        </div>
      )}

      {/* Success */}
      {successMessage && (
        <div
          role="status"
          className="rounded-xl border border-green-400/20 bg-green-500/10
          px-4 py-3 text-sm text-green-300"
        >
          {successMessage}
        </div>
      )}

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
          value={otp}
          onChange={handleOtpChange}
          disabled={isLoading || isResending}
          maxLength={6}
          className="w-full rounded-[10px] border border-white/[0.07]
          bg-[#242424] px-3 py-3 text-center text-lg tracking-[0.5em]
          text-white outline-none transition placeholder:text-[#666666]
          focus:border-white/[0.14] focus:bg-[#272727]
          disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* Verify */}
      <button
        type="submit"
        disabled={isLoading || isResending || otp.length !== 6}
        className="w-full rounded-[10px] bg-white px-4 py-3 text-[13px]
        font-medium text-black transition hover:bg-[#e8e8e8]
        focus:outline-none focus:ring-2 focus:ring-white/20
        disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Verifying..." : "Verify email"}
      </button>

      {/* Resend */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={isLoading || isResending}
          className="text-sm font-medium text-[#8d9bb5] transition
          hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isResending
            ? "Sending..."
            : "Didn't receive the code? Resend"}
        </button>
      </div>
    </form>
  );
}