export default function LoadingScreen() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#111111] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute left-1/2 top-1/2
            h-[420px] w-[420px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-indigo-500/[0.06]
            blur-[120px]
          "
        />
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo */}
        <div className="relative">
          <div
            className="
              absolute inset-0
              rounded-2xl
              bg-indigo-500/10
              blur-xl
              animate-pulse
            "
          />

          <div
            className="
              relative flex h-20 w-20
              items-center justify-center
              rounded-4xl
              border border-white/[0.08]
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            "
          >
            <img
              src="/chatAI-logo.png"
              alt="ChatAI"
              className="h-12 w-12 object-contain"
            />
          </div>
        </div>

        {/* Text */}
        <div className="mt-7 text-center">
          <h1 className="text-lg font-medium tracking-tight text-white">
            ChatAI
          </h1>

          <p className="mt-2 text-sm text-[#71809a]">
            Preparing your workspace
          </p>
        </div>

        {/* Loading dots */}
        <div className="mt-5 flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />

          <span
            className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </main>
  );
}