"use client";

import { useState } from "react";
import Link from "next/link";

/* ── gradient text: #603394 → violet-500 → pink-500 ── */
const G = ({ children }) => (
  <span
    className="bg-clip-text text-transparent"
    style={{
      backgroundImage: "linear-gradient(to right, #603394, #8b5cf6, #ec4899)",
    }}
  >
    {children}
  </span>
);

/* ── Eye icons ── */
const EyeOpen = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeClosed = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/* ── Google icon ── */
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

/* ── GitHub icon ── */
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

/* ── Left panel features ── */
const panelFeatures = [
  { icon: "🧠", text: "Advanced multi-step reasoning" },
  { icon: "💻", text: "Code across 30+ languages" },
  { icon: "✍️", text: "Write, edit, and create anything" },
  { icon: "🔒", text: "Private & encrypted by default" },
];

/* ── Reusable input field ── */
export function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  children,
  icon,
}) {
  return (
    <div className="flex flex-col gap-2 w-full text-start">
      {label && (
        <label
          htmlFor={id}
          className="text-[11px] font-bold tracking-[.1em] uppercase"
          style={{ color: error ? "#ef4444" : "#4a4a5e" }}
        >
          {label}
        </label>
      )}

      <div
        className="flex items-center bg-[#13131a]"
        style={{
          border: `1px solid ${error ? "rgba(239,68,68,0.4)" : "#2a2a3a"}`,
          borderLeft: `3px solid ${error ? "#ef4444" : "#7c3aed"}`,
        }}
      >
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={id}
          disabled={disabled}
          className="flex-1 h-[46px] px-3.5 border-none bg-transparent text-[15px] outline-none placeholder-[#4a4a5e]"
          style={{ color: disabled ? "#4a4a5e" : "#fff" }}
        />

        {/* icon / password toggle */}
        {(children || icon) && (
          <div className="w-9 h-9 mr-1 flex items-center justify-center flex-shrink-0">
            {children || icon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-[#f87171] flex items-center gap-1.5 mt-0.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f87171"
            strokeWidth="2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function LoginPage() {
  const [tab, setTab] = useState("signin");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    setForm((p) => ({
      ...p,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (tab === "signup" && !form.name.trim()) errs.name = "Name is required.";
    if (!form.email.includes("@")) errs.email = "Enter a valid email address.";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (tab === "signup" && form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  };

  /* ── brand gradient shorthand ── */
  const brandGrad =
    "linear-gradient(135deg, #603394 0%, #8b5cf6 50%, #ec4899 100%)";
  const brandGradRight = "linear-gradient(to right, #603394, #8b5cf6, #ec4899)";

  return (
    <div className="min-h-screen flex">
      {/* ══════════════════════════
          LEFT PANEL — dark side
      ══════════════════════════ */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden bg-[#0a0a0f]">
        {/* Blobs */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: "rgba(96,51,148,0.25)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"
          style={{ backgroundColor: "rgba(236,72,153,0.12)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: "rgba(139,92,246,0.08)" }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#a5b4fc 1px, transparent 1px), linear-gradient(90deg, #a5b4fc 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="relative w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105"
              style={{ background: brandGrad }}
            >
              <span className="relative z-10 text-white font-extrabold text-base">
                W
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <span
              className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent"
              style={{ backgroundImage: brandGradRight }}
            >
              we
            </span>
          </Link>
        </div>

        {/* Copy */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8 w-fit"
            style={{
              border: "1px solid rgba(96,51,148,0.35)",
              backgroundColor: "rgba(96,51,148,0.12)",
              color: "#c4a8e8",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#a78bcb" }}
            />
            2M+ people think with we
          </div>

          <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-5">
            Your AI companion
            <br />
            for everything
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: brandGradRight }}
            >
              you imagine.
            </span>
          </h2>

          <p className="text-gray-400 text-base leading-relaxed max-w-sm mb-10">
            Write, code, analyze, and explore ideas — with an AI that genuinely
            understands what you mean.
          </p>

          <ul className="flex flex-col gap-3.5">
            {panelFeatures.map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-base flex-shrink-0">
                  {icon}
                </div>
                <span className="text-sm text-gray-300">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-300 italic leading-relaxed mb-4">
              "we is the first AI that actually keeps up with how I think. It's
              changed how I work, completely."
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #603394, #8b5cf6)",
                }}
              >
                KN
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-200">
                  Karim Nasser
                </p>
                <p className="text-xs text-gray-500">Senior Engineer, Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          RIGHT PANEL — form
      ══════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-gray-50 relative overflow-hidden">
        {/* Blobs */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3"
          style={{ backgroundColor: "rgba(96,51,148,0.08)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[70px] pointer-events-none -translate-x-1/3 translate-y-1/3"
          style={{ backgroundColor: "rgba(236,72,153,0.07)" }}
        />

        <div className="relative z-10 w-full max-w-[440px]">
          {/* Mobile logo */}
          <div className="flex lg:hidden justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105"
                style={{ background: brandGrad }}
              >
                <span className="relative z-10 text-white font-extrabold text-sm">
                  W
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <span
                className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent"
                style={{ backgroundImage: brandGradRight }}
              >
                we
              </span>
            </Link>
          </div>

          {/* ── SUCCESS ── */}
          {success ? (
            <div className="text-center py-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: brandGrad,
                  boxShadow: "0 20px 40px rgba(96,51,148,0.3)",
                }}
              >
                <svg
                  className="w-9 h-9 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                {tab === "signup" ? "Account created!" : "Welcome back!"}
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                {tab === "signup"
                  ? "Your we account is ready. Redirecting you now…"
                  : "You're signed in. Redirecting to your workspace…"}
              </p>
              <div className="flex justify-center gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: brandGradRight,
                      animationDelay: `${delay}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-1.5">
                  {tab === "signin" ? (
                    <>
                      Welcome back <G>✦</G>
                    </>
                  ) : (
                    <>
                      Join <G>we</G> today
                    </>
                  )}
                </h1>
                <p className="text-sm text-gray-500">
                  {tab === "signin"
                    ? "Sign in to continue to your workspace."
                    : "Create your free account — no credit card needed."}
                </p>
              </div>

              {/* Tab switcher */}
              <div className="flex items-center gap-1 p-1 bg-gray-200/70 rounded-xl mb-7">
                {["signin", "signup"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTab(t);
                      setErrors({});
                      setForm({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        remember: false,
                      });
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border-none cursor-pointer ${
                      tab === t
                        ? "bg-white text-gray-900 shadow-sm"
                        : "bg-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t === "signin" ? "Sign in" : "Create account"}
                  </button>
                ))}
              </div>

              {/* Social buttons */}
              <div className="flex gap-3 mb-5">
                <button className="flex-1 flex items-center justify-center gap-2.5 h-11 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150 cursor-pointer">
                  <GoogleIcon /> Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2.5 h-11 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150 cursor-pointer">
                  <GithubIcon /> GitHub
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">
                  or continue with email
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full "
                noValidate
              >
                {tab === "signup" && (
                  <InputField
                    label="Full name"
                    id="name"
                    placeholder="Sara Ramos"
                    value={form.name}
                    onChange={set("name")}
                    error={errors.name}
                  />
                )}

                <InputField
                  label="Email address"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                />

                <InputField
                  label="Password"
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder={
                    tab === "signup" ? "Min. 6 characters" : "••••••••"
                  }
                  value={form.password}
                  onChange={set("password")}
                  error={errors.password}
                >
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150 bg-transparent border-none cursor-pointer p-0"
                  >
                    {showPass ? <EyeClosed /> : <EyeOpen />}
                  </button>
                </InputField>

                {tab === "signup" && (
                  <InputField
                    label="Confirm password"
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={set("confirmPassword")}
                    error={errors.confirmPassword}
                  >
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150 bg-transparent border-none cursor-pointer p-0"
                    >
                      {showConfirm ? <EyeClosed /> : <EyeOpen />}
                    </button>
                  </InputField>
                )}

                {tab === "signin" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.remember}
                        onChange={set("remember")}
                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                        style={{ accentColor: "#603394" }}
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-semibold transition-colors duration-150"
                      style={{ color: "#603394" }}
                      onMouseEnter={(e) => (e.target.style.color = "#4a2570")}
                      onMouseLeave={(e) => (e.target.style.color = "#603394")}
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                {tab === "signup" && (
                  <p className="text-xs text-gray-400 leading-relaxed">
                    By creating an account you agree to our{" "}
                    <Link
                      href="/terms"
                      className="hover:underline"
                      style={{ color: "#603394" }}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="hover:underline"
                      style={{ color: "#603394" }}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full h-12 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-200 border-none cursor-pointer mt-1 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-px active:translate-y-0"
                  style={{
                    background: brandGrad,
                    boxShadow: loading
                      ? "none"
                      : "0 4px 16px rgba(96,51,148,0.35)",
                  }}
                >
                  <span
                    className={`relative z-10 flex items-center justify-center gap-2 transition-opacity duration-200 ${
                      loading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {tab === "signin" ? "Sign in to we" : "Create my account"}
                    <span>→</span>
                  </span>

                  {loading && (
                    <span className="absolute inset-0 flex items-center justify-center z-10">
                      <svg
                        className="w-5 h-5 text-white animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
                </button>
              </form>

              {/* Switch tab */}
              <p className="text-center text-sm text-gray-500 mt-6">
                {tab === "signin" ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => {
                        setTab("signup");
                        setErrors({});
                      }}
                      className="font-semibold bg-transparent border-none cursor-pointer p-0 transition-colors duration-150"
                      style={{ color: "#603394" }}
                    >
                      Sign up free →
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setTab("signin");
                        setErrors({});
                      }}
                      className="font-semibold bg-transparent border-none cursor-pointer p-0 transition-colors duration-150"
                      style={{ color: "#603394" }}
                    >
                      Sign in →
                    </button>
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
