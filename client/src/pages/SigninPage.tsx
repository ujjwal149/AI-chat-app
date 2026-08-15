import { useNavigate } from "react-router-dom";
import SigninForm from "../components/auth/SigninForm";

export default function SigninPage() {
  const navigate = useNavigate();

  return (
    <main className="max-h-screen bg-[#111111] flex items-center justify-center px-4 py-10">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="  absolute  left-1/2  top-[-120px]  h-[500px]  w-[500px]  -translate-x-1/2  rounded-full  bg-indigo-500/[0.06]  blur-[120px]"
        />
      </div>

      {/* Card wrapper */}
      <div className="relative w-full max-w-xl">

        {/* Back layer 1 */}
        <div
          className="  absolute  -inset-3  translate-x-3  translate-y-3  rounded-[28px]  border  border-white/[0.04]  bg-white/[0.008]"
        />

        {/* Back layer 2 */}
        <div
          className="  absolute  -inset-1.5  translate-x-1.5  translate-y-1.5  rounded-[28px]  border  border-white/[0.06]  bg-white/[0.01]"
        />

        {/* Main card */}
        <section
          className="  relative  z-10  w-full  rounded-[28px]  border  border-white/[0.10]  
                      bg-[#181818]  px-6  py-10  shadow-2xl  sm:px-12  sm:py-12"
        >

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src="/chatAI-logo.png"
              alt="AI Chat"
              className="h-16 w-16 object-contain"
            />
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-medium tracking-tight text-white">
              Welcome back
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
              Sign in to continue your conversations with AI.
            </p>
          </div>

          {/* Form */}
          <SigninForm />

          {/* Forgot password */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-medium text-gray-400 transition hover:text-white cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Terms */}
          <p className="mx-auto mt-6 max-w-md text-center text-xs leading-5 text-gray-500">
            By continuing, you agree to our{" "}
            <span className="text-gray-300">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-gray-300">
              Privacy Policy
            </span>.
          </p>

          {/* Signup */}
          <div className="mt-7 border-t border-white/[0.08] pt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="  font-medium  text-white  transition cursor-pointer  hover:text-indigo-400"
              >
                Create account
              </button>
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}