import { useNavigate } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-4 py-10">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-[-120px]
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-indigo-500/[0.06]
            blur-[120px]
          "
        />
      </div>

      {/* Card stack */}
      <div className="relative w-full max-w-2xl">

        {/* Back layer 1 */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            translate-x-3
            translate-y-3
            rounded-[28px]
            border
            border-white/[0.04]
            bg-white/[0.008]
          "
        />

        {/* Back layer 2 */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            translate-x-1.5
            translate-y-1.5
            rounded-[28px]
            border
            border-white/[0.06]
            bg-white/[0.012]
          "
        />

        {/* Main card */}
        <section
          className="
            relative
            z-10
            w-full
            rounded-[28px]
            border
            border-white/[0.10]
            bg-[#181818]
            px-8
            py-10
            shadow-[0_25px_80px_rgba(0,0,0,0.45)]
            sm:px-14
            sm:py-12
          "
        >

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src="/chatAI-logo.png"
              alt="chatAI"
              className="h-16 w-16 object-contain"
            />
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-[30px] font-medium tracking-tight text-white">
              Create account
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8d9bb5]">
              Create your account and start chatting with AI.
            </p>
          </div>

          {/* Signup form */}
          <SignupForm />

          {/* Sign in */}
          <div className="mt-8 border-t border-white/[0.08] pt-6 text-center">
            <p className="text-sm text-[#71809a]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="
                  font-medium
                  text-white
                  transition
                  hover:text-gray-300
                "
              >
                Sign in
              </button>
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}