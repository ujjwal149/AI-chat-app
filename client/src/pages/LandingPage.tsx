
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

export default function LandingPage() {
  const navigate = useNavigate();

  const [technologyVisible, setTechnologyVisible] = useState(false);
  const technologyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = technologyRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setTechnologyVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#111111] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-[-180px]
            h-[420px]
            w-[420px]
            -translate-x-1/2
            rounded-full
            bg-indigo-500/[0.06]
            blur-[120px]
            sm:h-[500px]
            sm:w-[500px]
            lg:h-[600px]
            lg:w-[600px]
            lg:blur-[140px]
          "
        />
      </div>

      {/*   DESKTOP SIDEBAR */}
      <aside
        className="
          fixed
          left-0
          top-0
          z-40
          hidden
          h-screen
          w-56
          flex-col
          border-r
          border-white/[0.08]
          bg-[#111111]/90
          px-6
          py-8
          backdrop-blur-md
          lg:flex
          lg:w-[260px]
          lg:px-7
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/chatAI-logo.png"
            alt="AI Chat"
            className="h-10 w-10 object-contain"
          />

          <span className="text-sm font-medium text-white">
            AI Chat App
          </span>
        </div>

        {/* Authentication */}
        <div className="mt-10 space-y-3">
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="
              flex w-full items-center justify-center gap-3
              cursor-pointer rounded-[10px]
              border border-white/[0.10]
              bg-white/[0.04]
              px-2 py-3
              text-sm font-medium text-white
              transition hover:bg-white/[0.08]
              focus:outline-none
              focus:ring-2 focus:ring-white/20
            "
          >
            <FcGoogle className="h-5 w-5" />
            
            Continue with Google
          </button>

          {/* Sign in */}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="
              w-full
              rounded-[10px]
              bg-white
              px-4 py-3
              cursor-pointer
              text-sm
              font-medium
              text-black
              transition
              hover:bg-[#e8e8e8]
              focus:outline-none
              focus:ring-2
              focus:ring-white/20
            "
          >
            Sign in
          </button>

          {/* Sign up */}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="
              w-full
              rounded-[10px]
              border
              border-white/[0.08]
              bg-transparent
              px-4
              py-3
              cursor-pointer
              text-sm
              font-medium
              text-gray-300
              transition
              hover:border-white/[0.15]
              hover:text-white
            "
          >
            Create account
          </button>
        </div>

        {/* Bottom text */}
        <div className="mt-auto">
          <p className="text-xs leading-5 text-gray-600">
            AI-powered conversations,
            <br />
            built for simplicity.
          </p>
        </div>
      </aside>

      {/*  MOBILE / TABLET HEADER  */}
      <header
        className="
          sticky
          top-0
          z-30
          flex
          h-16
          w-full
          items-center
          justify-between
          border-b
          border-white/[0.08]
          bg-[#111111]/90
          px-4
          backdrop-blur-md
          lg:hidden
          sm:px-6
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="/chatAI-logo.png"
            alt="AI Chat"
            className="h-9 w-9 object-contain"
          />

          <span className="text-sm font-medium text-white sm:text-base">
            AI Chat App
          </span>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-2">
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="
              hidden
              rounded-[9px]
              border
              border-white/[0.10]
              bg-white/[0.04]
              px-3
              py-2
              text-xs
              font-medium
              text-white
              transition
              hover:bg-white/[0.08]
              sm:block
              sm:px-4
              sm:text-sm
            "
          >
            Google
          </button>

          {/* Sign in */}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="
              rounded-[9px]
              border
              border-white/[0.10]
              bg-white/[0.04]
              px-3
              py-2
              text-xs
              font-medium
              text-white
              transition
              hover:bg-white/[0.08]
              sm:px-4
              sm:text-sm
            "
          >
            Sign in
          </button>

          {/* Sign up */}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="
              hidden
              rounded-[9px]
              bg-white
              px-3
              py-2
              text-xs
              font-medium
              text-black
              transition
              hover:bg-[#e8e8e8]
              sm:block
              sm:px-4
              sm:text-sm
            "
          >
            Sign up
          </button>
        </div>
      </header>

      {/*  MAIN CONTENT */}
      <section
        className="
          min-h-screen
          lg:ml-[260px]
        "
      >
        {/*  HERO */}
        <div
          className="
            flex
            min-h-[calc(100vh-4rem)]
            items-center
            justify-center
            px-5
            py-16
            sm:px-8
            sm:py-20
            md:min-h-screen
            md:px-12
            lg:px-16
            lg:py-20
            xl:px-20
          "
        >
          <div className="w-full max-w-4xl">
            <p className="mb-4 text-sm font-medium text-indigo-400 sm:mb-5">
              AI-powered conversations
            </p>

            <h1
              className="
                max-w-4xl
                text-4xl
                font-medium
                leading-[1.08]
                tracking-tight
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              A simpler way to
              <span className="text-gray-500">
                {" "}chat with AI.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-6
                text-gray-400
                sm:mt-7
                sm:text-base
                sm:leading-7
                lg:text-lg
              "
            >
              AI Chat App gives you a simple and focused environment
              for having conversations with artificial intelligence,
              while keeping your conversations connected and accessible.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              {/* Get started */}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="
                  w-full
                  rounded-[10px]
                  bg-white
                  px-5
                  py-3
                  text-sm 
                  cursor-pointer
                  font-medium
                  text-black
                  transition
                  hover:bg-[#e8e8e8]
                  sm:w-auto
                "
              >
                Get started
              </button>

              {/* Sign in */}
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="
                  w-full
                  rounded-[10px]
                  border
                  border-white/[0.10]
                  bg-white/[0.03]
                  px-5
                  py-3
                  cursor-pointer
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-white/[0.07]
                  sm:w-auto
                "
              >
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            ABOUT
        ================================================= */}
        <section
          className="
            border-t
            border-white/[0.06]
            px-5
            py-16
            sm:px-8
            sm:py-20
            md:px-12
            lg:px-16
            lg:py-24
            xl:px-20
          "
        >
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-indigo-400">
              About the application
            </p>

            <h2
              className="
                mt-3
                text-2xl
                font-medium
                tracking-tight
                text-white
                sm:mt-4
                sm:text-3xl
                md:text-4xl
              "
            >
              Built around the conversation.
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-6
                text-gray-400
                sm:mt-6
                sm:text-base
                sm:leading-7
              "
            >
              AI Chat App is designed to make interacting with AI
              straightforward. Start a conversation, send your message,
              and receive responses without unnecessary complexity.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section
          className="
            border-t
            border-white/[0.06]
            px-5
            py-16
            sm:px-8
            sm:py-20
            md:px-12
            lg:px-16
            lg:py-24
            xl:px-20
          "
        >
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-indigo-400">
              Features
            </p>

            <h2
              className="
                mt-3
                text-2xl
                font-medium
                tracking-tight
                text-white
                sm:mt-4
                sm:text-3xl
                md:text-4xl
              "
            >
              Everything you need to chat with AI.
            </h2>

            <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2">
              {[
                {
                  title: "AI conversations",
                  description:
                    "Interact with an AI model through a clean conversational interface.",
                },
                {
                  title: "Conversation memory",
                  description:
                    "Keep conversations connected so the AI can work with previous context.",
                },
                {
                  title: "Secure authentication",
                  description:
                    "Sign up, verify your email, sign in, and securely access your conversations.",
                },
                {
                  title: "Streaming responses",
                  description:
                    "See AI responses arrive progressively instead of waiting for the entire response.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="
                    rounded-[18px]
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    p-5
                    transition
                    hover:border-white/[0.12]
                    hover:bg-white/[0.03]
                    sm:p-6
                  "
                >
                  <h3 className="text-base font-medium text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          className="
            border-t
            border-white/[0.06]
            px-5
            py-16
            sm:px-8
            sm:py-20
            md:px-12
            lg:px-16
            lg:py-24
            xl:px-20
          "
        >
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-indigo-400">
              How it works
            </p>

            <h2
              className="
                mt-3
                text-2xl
                font-medium
                tracking-tight
                text-white
                sm:mt-4
                sm:text-3xl
                md:text-4xl
              "
            >
              From question to answer.
            </h2>

            <div className="mt-8 space-y-3 sm:mt-12 sm:space-y-4">
              {[
                [
                  "01",
                  "Create an account",
                  "Create your account and verify your email.",
                ],
                [
                  "02",
                  "Start a conversation",
                  "Open the chat and send your first message.",
                ],
                [
                  "03",
                  "AI processes your request",
                  "Your message is sent to the AI service.",
                ],
                [
                  "04",
                  "Receive the response",
                  "The AI response is streamed back into your conversation.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="
                    flex
                    gap-4
                    rounded-[18px]
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    p-4
                    sm:gap-5
                    sm:p-5
                  "
                >
                  <span className="shrink-0 text-sm font-medium text-gray-600">
                    {number}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-white">
                      {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section
          ref={technologyRef}
          className="
            border-t
            border-white/[0.06]
            px-5
            py-16
            sm:px-8
            sm:py-20
            md:px-12
            lg:px-16
            lg:py-24
            xl:px-20
          "
        >
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-indigo-400">
              Technology
            </p>

            <h2
              className="
                mt-3
                text-2xl
                font-medium
                tracking-tight
                text-white
                sm:mt-4
                sm:text-3xl
                md:text-4xl
              "
            >
              Built with modern web technologies.
            </h2>

            <div className="mt-8 flex flex-wrap gap-2.5 sm:mt-10 sm:gap-3">
              {[
                "React",
                "TypeScript",
                "Node.js",
                "Express",
                "PostgreSQL",
                "Prisma",
                "Groq",
                "JWT",
                "Zustand",
              ].map((technology, index) => (
                <span
                  key={technology}
                  style={{
                    animationDelay: `${index * 120}ms`,
                  }}
                  className={`
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    px-3
                    py-1.5
                    text-xs
                    text-gray-400
                    sm:px-4
                    sm:py-2
                    sm:text-sm
                    ${
                      technologyVisible
                        ? "animate-slide-in"
                        : "opacity-0"
                    }
                  `}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="
            border-t
            border-white/[0.06]
            px-5
            py-8
            sm:px-8
            sm:py-10
            md:px-12
            lg:px-16
            xl:px-20
          "
        >
          <div
            className="
              mx-auto
              flex
              max-w-4xl
              flex-col
              gap-2
              text-center
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:text-left
            "
          >
            <p className="text-xs text-gray-600">
              AI Chat App
            </p>

            <p className="text-xs text-gray-600">
              Built with React and TypeScript
            </p>
          </div>
        </footer>
      </section>
    </main>
  );
}

