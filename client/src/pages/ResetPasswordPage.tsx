import { useLocation, useNavigate } from "react-router-dom";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const resetToken = location.state?.resetToken;

  if (!resetToken) {
    navigate("/forgot-password", { replace: true });
    return null;
  }

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center
      overflow-hidden bg-[#111111] px-3 py-4 text-white sm:px-4"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-[-120px] h-[500px] w-[500px]
          -translate-x-1/2 rounded-full bg-indigo-500/[0.06] blur-[120px]"
        />
      </div>

      {/* Card stack */}
      <div className="relative mx-auto w-full max-w-xl">

        {/* Back layer 1 */}
        <div
          className="pointer-events-none absolute inset-0 translate-x-2
          translate-y-2 rounded-[28px] border border-white/[0.04]
          bg-white/[0.008]"
        />

        {/* Back layer 2 */}
        <div
          className="pointer-events-none absolute inset-0 translate-x-1
          translate-y-1 rounded-[28px] border border-white/[0.06]
          bg-white/[0.012]"
        />

        {/* Main card */}
        <section
          className="relative z-10 w-full rounded-[28px] border
          border-white/[0.10] bg-[#181818] px-6 py-7
          shadow-[0_25px_80px_rgba(0,0,0,0.45)]
          sm:px-10 sm:py-8 md:px-12 md:py-9"
        >
          {/* Logo */}
          <div className="mb-5 flex justify-center sm:mb-6">
            <img
              src="/chatAI-logo.png"
              alt="chatAI"
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
          </div>

          {/* Heading */}
          <div className="mb-6 text-center sm:mb-7">
            <h1
              className="text-[26px] font-medium tracking-tight
              text-white sm:text-[30px]"
            >
              Reset your password
            </h1>

            <p
              className="mx-auto mt-2 max-w-md text-sm leading-5
              text-[#8d9bb5] sm:mt-3 sm:leading-6"
            >
              Enter a new password for your account.
            </p>
          </div>

          <ResetPasswordForm resetToken={resetToken} />

          {/* Back */}
          <div
            className="mt-6 border-t border-white/[0.08] pt-5
            text-center sm:mt-7 sm:pt-6"
          >
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-sm font-medium text-white transition
              hover:text-gray-300 cursor-pointer"
            >
              Back to sign in
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}