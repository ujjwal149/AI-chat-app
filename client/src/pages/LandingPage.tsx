import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#111111] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-[-180px] h-[600px] w-[600px]
          -translate-x-1/2 rounded-full bg-indigo-500/[0.06] blur-[140px]"
        />
      </div>

      {/* Fixed left panel */}
      <aside
        className="fixed left-0 top-0 z-20 flex h-screen w-[260px]
        flex-col border-r border-white/[0.08] bg-[#111111]/90
        px-7 py-8 backdrop-blur-md"
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
        <div className="mt-12 space-y-3">

          {/* Google */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3
            rounded-[10px] border border-white/[0.10]
            bg-white/[0.04] px-4 py-3 text-sm font-medium
            text-white transition hover:bg-white/[0.08]
            focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Continue with Google
          </button>

          {/* Sign in */}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="w-full rounded-[10px] bg-white px-4 py-3
            text-sm font-medium text-black transition
            hover:bg-[#e8e8e8] focus:outline-none
            focus:ring-2 focus:ring-white/20"
          >
            Sign in
          </button>

          {/* Sign up */}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full rounded-[10px] border border-white/[0.08]
            bg-transparent px-4 py-3 text-sm font-medium
            text-gray-300 transition hover:border-white/[0.15]
            hover:text-white"
          >
            Create account
          </button>
        </div>

        {/* Bottom text */}
        <div className="mt-auto">
          <p className="text-xs leading-5 text-gray-600">
            AI-powered conversations,
            built for simplicity.
          </p>
        </div>
      </aside>

      {/* Scrollable content */}
      <section className="ml-[260px] min-h-screen">

        {/* Hero */}
        <div
          className="flex min-h-screen items-center justify-center
          px-8 py-20 sm:px-12 lg:px-20"
        >
          <div className="w-full max-w-4xl">

            <p className="mb-5 text-sm font-medium text-indigo-400">
              AI-powered conversations
            </p>

            <h1
              className="max-w-4xl text-5xl font-medium
              tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              A simpler way to
              <span className="text-gray-500">
                {" "}chat with AI.
              </span>
            </h1>

            <p
              className="mt-7 max-w-2xl text-base leading-7
              text-gray-400 sm:text-lg"
            >
              AI Chat App gives you a simple and focused environment
              for having conversations with artificial intelligence,
              while keeping your conversations connected and accessible.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="rounded-[10px] bg-white px-5 py-3
                text-sm font-medium text-black transition
                hover:bg-[#e8e8e8]"
              >
                Get started
              </button>

              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="rounded-[10px] border border-white/[0.10]
                bg-white/[0.03] px-5 py-3 text-sm font-medium
                text-white transition hover:bg-white/[0.07]"
              >
                Sign in
              </button>
            </div>

          </div>
        </div>

        {/* About */}
        <section className="border-t border-white/[0.06] px-8 py-24 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl">

            <p className="text-sm font-medium text-indigo-400">
              About the application
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Built around the conversation.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              AI Chat App is designed to make interacting with AI
              straightforward. Start a conversation, send your message,
              and receive responses without unnecessary complexity.
            </p>

          </div>
        </section>

        {/* Features */}
        <section className="border-t border-white/[0.06] px-8 py-24 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl">

            <p className="text-sm font-medium text-indigo-400">
              Features
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Everything you need to chat with AI.
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">

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
                  className="rounded-[18px] border border-white/[0.08]
                  bg-white/[0.02] p-6 transition
                  hover:border-white/[0.12] hover:bg-white/[0.03]"
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

        {/* How it works */}
        <section className="border-t border-white/[0.06] px-8 py-24 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl">

            <p className="text-sm font-medium text-indigo-400">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              From question to answer.
            </h2>

            <div className="mt-12 space-y-4">

              {[
                ["01", "Create an account", "Create your account and verify your email."],
                ["02", "Start a conversation", "Open the chat and send your first message."],
                ["03", "AI processes your request", "Your message is sent to the AI service."],
                ["04", "Receive the response", "The AI response is streamed back into your conversation."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="flex gap-5 rounded-[18px]
                  border border-white/[0.08] bg-white/[0.02]
                  p-5"
                >
                  <span className="text-sm font-medium text-gray-600">
                    {number}
                  </span>

                  <div>
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

        {/* Technology */}
        <section
          ref={technologyRef}
          className="border-t border-white/[0.06] px-8 py-24 sm:px-12 lg:px-20"
        >
          <div className="mx-auto max-w-4xl">

            <p className="text-sm font-medium text-indigo-400">
              Technology
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Built with modern web technologies.
            </h2>

            <div className="mt-10 flex flex-wrap gap-3">
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
                    border border-white/[0.08]
                    bg-white/[0.02]
                    px-4 py-2
                    text-sm text-gray-400
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

        {/* Footer */}
        <footer className="border-t border-white/[0.06] px-8 py-10 sm:px-12 lg:px-20">
          <div className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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