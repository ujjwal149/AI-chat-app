import { useState, type FormEvent } from "react";
import { signupSchema } from "../../validations/authSchema";
import { signup } from "../../services/authService";

type FieldErrors = Partial<
  Record<"name" | "email" | "password", string>
>;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    if (
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null
    ) {
      const response = error.response;

      if (
        "data" in response &&
        typeof response.data === "object" &&
        response.data !== null &&
        "message" in response.data &&
        typeof response.data.message === "string"
      ) {
        return response.data.message;
      }
    }

    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return "Unable to create your account. Please try again.";
}

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [backendError, setBackendError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFieldErrors({});
    setBackendError("");
    setSuccessMessage("");

    const result = signupSchema.safeParse({
      name,
      email,
      password,
    });

    if (!result.success) {
      const errors: FieldErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (
          (field === "name" ||
            field === "email" ||
            field === "password") &&
          !errors[field]
        ) {
          errors[field] = issue.message;
        }
      }

      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      await signup(result.data);

      setSuccessMessage("Your account was created successfully.");
    } catch (error: unknown) {
      setBackendError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full space-y-5"
    >
      {/* Backend error */}
      {backendError && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {backendError}
        </div>
      )}

      {/* Success */}
      {successMessage && (
        <div
          role="status"
          className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
        >
          {successMessage}
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
  <label
    htmlFor="signup-name"
    className="block text-[13px] font-medium text-[#e5e5e5]"
  >
    Name
  </label>

  <input
    id="signup-name"
    name="name"
    type="text"
    placeholder="Your name"
    value={name}
    onChange={(event) => setName(event.target.value)}
    disabled={isLoading}
    aria-invalid={Boolean(fieldErrors.name)}
    aria-describedby={
      fieldErrors.name ? "signup-name-error" : undefined
    }
    autoComplete="name"
    className="
      w-full
      rounded-[10px]
      border
      border-white/[0.07]
      bg-[#242424]
      px-3
      py-3
      text-[13px]
      text-white
      outline-none
      transition
      placeholder:text-[#666666]
      focus:border-white/[0.14]
      focus:bg-[#272727]
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
  />

  {fieldErrors.name && (
    <p
      id="signup-name-error"
      className="text-xs text-red-300"
    >
      {fieldErrors.name}
    </p>
  )}
</div>

      {/* Email */}
      <div className="space-y-2">
  <label
    htmlFor="signup-email"
    className="block text-[13px] font-medium text-[#e5e5e5]"
  >
    Email
  </label>

  <input
    id="signup-email"
    name="email"
    type="email"
    placeholder="you@example.com"
    value={email}
    onChange={(event) => setEmail(event.target.value)}
    disabled={isLoading}
    aria-invalid={Boolean(fieldErrors.email)}
    aria-describedby={
      fieldErrors.email ? "signup-email-error" : undefined
    }
    autoComplete="email"
    className="
      w-full
      rounded-[10px]
      border
      border-white/[0.07]
      bg-[#242424]
      px-3
      py-3
      text-[13px]
      text-white
      outline-none
      transition
      placeholder:text-[#666666]
      focus:border-white/[0.14]
      focus:bg-[#272727]
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
  />

  {fieldErrors.email && (
    <p
      id="signup-email-error"
      className="text-xs text-red-300"
    >
      {fieldErrors.email}
    </p>
  )}
</div>

      {/* Password */}
      <div className="space-y-2">
  <label
    htmlFor="signup-password"
    className="block text-[13px] font-medium text-[#e5e5e5]"
  >
    Password
  </label>

  <input
    id="signup-password"
    name="password"
    type="password"
    placeholder="••••••••"
    value={password}
    onChange={(event) => setPassword(event.target.value)}
    disabled={isLoading}
    aria-invalid={Boolean(fieldErrors.password)}
    aria-describedby={
      fieldErrors.password ? "signup-password-error" : undefined
    }
    autoComplete="new-password"
    className="
      w-full
      rounded-[10px]
      border
      border-white/[0.07]
      bg-[#242424]
      px-3
      py-3
      text-[13px]
      text-white
      outline-none
      transition
      placeholder:text-[#666666]
      focus:border-white/[0.14]
      focus:bg-[#272727]
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
  />

  {fieldErrors.password && (
    <p
      id="signup-password-error"
      className="text-xs text-red-300"
    >
      {fieldErrors.password}
    </p>
  )}
</div>

      {/* Submit */}
      <button
  type="submit"
  disabled={isLoading}
  className="
    w-full
    rounded-[10px]
    bg-white
    px-4
    py-3
    text-[13px]
    font-medium
    text-black
    transition
    hover:bg-[#e8e8e8]
    focus:outline-none
    focus:ring-2
    focus:ring-white/20
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
>
  {isLoading ? "Creating account..." : "Sign up"}
</button>
    </form>
  );
}