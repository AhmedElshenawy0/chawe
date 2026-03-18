"use client";
import Link from "next/link";
import { useState } from "react";

/* ── brand ── */
const BRAND = "#603394";
const brandGrad =
  "linear-gradient(135deg, #603394 0%, #8b5cf6 50%, #ec4899 100%)";
const brandGradR = "linear-gradient(to right, #603394, #8b5cf6, #ec4899)";

/* ── gradient text ── */
const G = ({ children, className = "" }) => (
  <span
    className={`bg-clip-text text-transparent ${className}`}
    style={{ backgroundImage: brandGradR }}
  >
    {children}
  </span>
);

/* ══════════════════════════════════════
   InputField — light theme to match page
══════════════════════════════════════ */
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
          style={{ color: error ? "#ef4444" : "#7c3aed" }}
        >
          {label}
        </label>
      )}

      <div
        className="flex items-center transition-all duration-200"
        style={{
          background: error ? "rgba(239,68,68,0.04)" : "rgba(96,51,148,0.04)",
          border: `1px solid ${error ? "rgba(239,68,68,0.35)" : "rgba(96,51,148,0.15)"}`,
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
          className="flex-1 h-[46px] px-3.5 border-none bg-transparent text-[15px] outline-none"
          style={{
            color: disabled ? "#9580b8" : "#1e0b3e",
            caretColor: "#7c3aed",
          }}
        />

        {(children || icon) && (
          <div className="w-9 h-9 mr-1 flex items-center justify-center flex-shrink-0">
            {children || icon}
          </div>
        )}
      </div>

      {error && (
        <p
          className="text-xs flex items-center gap-1.5 mt-0.5"
          style={{ color: "#ef4444" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
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

/* ── static data ── */
const features = [
  {
    icon: "🧠",
    title: "Deep Reasoning",
    desc: "Multi-step thinking across complex topics — strategy, science, philosophy, and beyond.",
    from: "from-purple-50",
    to: "to-violet-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    icon: "✍️",
    title: "Creative Writing",
    desc: "Polished essays, stories, scripts, and copy — with your voice, elevated.",
    from: "from-violet-50",
    to: "to-pink-50",
    border: "border-violet-100",
    iconBg: "bg-violet-100",
  },
  {
    icon: "💻",
    title: "Code Assistant",
    desc: "Debug, explain, and generate code across 30+ languages. Ship faster.",
    from: "from-pink-50",
    to: "to-rose-50",
    border: "border-pink-100",
    iconBg: "bg-pink-100",
  },
  {
    icon: "📊",
    title: "Data Analysis",
    desc: "Ask questions about your data and get clear, structured insights instantly.",
    from: "from-purple-50",
    to: "to-sky-50",
    border: "border-sky-100",
    iconBg: "bg-sky-100",
  },
  {
    icon: "🌐",
    title: "Multilingual",
    desc: "Converse and create content fluently in over 50 languages.",
    from: "from-emerald-50",
    to: "to-teal-50",
    border: "border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "🔒",
    title: "Private by Design",
    desc: "Your conversations are encrypted and never used to train our models.",
    from: "from-amber-50",
    to: "to-orange-50",
    border: "border-amber-100",
    iconBg: "bg-amber-100",
  },
];

const testimonials = [
  {
    quote:
      "we cut my research time in half. It's like having a brilliant colleague available 24/7.",
    name: "Sara Ramos",
    role: "Product Lead, Vercel",
    initials: "SR",
    grad: "linear-gradient(135deg,#603394,#8b5cf6)",
  },
  {
    quote:
      "The code assistant is genuinely scary good. It understands context other tools completely miss.",
    name: "Karim Nasser",
    role: "Senior Engineer, Stripe",
    initials: "KN",
    grad: "linear-gradient(135deg,#8b5cf6,#ec4899)",
  },
  {
    quote:
      "I use we for every first draft now. The writing quality is unlike anything I've tried.",
    name: "Lena Hoffmann",
    role: "Content Director, Linear",
    initials: "LH",
    grad: "linear-gradient(135deg,#ec4899,#f43f5e)",
  },
];

const stats = [
  { value: "10M+", label: "Messages per day" },
  { value: "180+", label: "Countries served" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9★", label: "Average rating" },
];

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function HelloPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const set = (field) => (e) => {
    setForm((p) => ({
      ...p,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.includes("@")) errs.email = "Enter a valid email address.";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
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

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ══════ HERO ══════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-12 pb-20 overflow-hidden">
        {/* Blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
            style={{ backgroundColor: "rgba(96,51,148,0.12)" }}
          />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/25 blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 w-[700px] h-[400px] -translate-x-1/2 rounded-full bg-violet-200/20 blur-[120px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${BRAND} 1px, transparent 1px), linear-gradient(90deg, ${BRAND} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center justify-center mb-10">
          <div className="relative z-10 w-[110px] h-[110px] rounded-2xl overflow-hidden animate-pulse">
            <img
              src="/Gen-4TurboSlowsubtlerotationpulsingglow2216139408-ezgif.com-video-to-webp-converter.webp"
              alt="We Logo"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-[11px] md:text-sm font-medium mb-8 shadow-sm"
          style={{ border: `1px solid rgba(96,51,148,0.25)`, color: BRAND }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: BRAND }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: BRAND }}
            />
          </span>
          Introducing we — Advanced reasoning is here
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: BRAND }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: BRAND }}
            />
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-gray-900 mb-6 max-w-5xl">
          Elevate Your Sales
          <br />
          <span className="relative inline-block">
            <G>Intelligence.</G>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
            >
              <path
                d="M2 8 C50 2, 100 12, 150 6 S250 2, 298 8"
                stroke="url(#sq)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="sq" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%" stopColor="#603394" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="text-sm sm:text-xl text-gray-500 leading-relaxed max-w-2xl mb-10">
          Access the official Sales@WE assistant. Get instant answers to product
          specs, pricing, and internal protocols — powered by AI.
        </p>

        {/* ── FORM ── */}
        <div className="w-full max-w-md mx-auto">
          <div
            className="p-8 sm:p-10 bg-white/80 backdrop-blur-sm"
            style={{
              borderRadius: "20px",
              border: "1px solid rgba(96,51,148,0.12)",
              borderTop: "3px solid #7c3aed",
              boxShadow:
                "0 20px 60px rgba(96,51,148,0.1), 0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            {/* Form header */}
            <div className="mb-6 text-left">
              <p
                className="text-[22px] font-bold tracking-tight mb-1"
                style={{ color: "#1e0b3e" }}
              >
                Sign in
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <InputField
                label="Your Name"
                id="name"
                type={showPass ? "text" : "name"}
                placeholder="Enter your name"
                value={form.name}
                onChange={set("name")}
                error={errors.password}
                icon={
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="flex items-center justify-center w-full h-full bg-transparent border-none cursor-pointer"
                  ></button>
                }
              />
              <InputField
                label="Email address"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                error={errors.email}
              />

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={set("remember")}
                    className="sr-only"
                  />
                  <div
                    className="w-4 h-4 flex items-center justify-center transition-all duration-150"
                    style={{
                      border: `1.5px solid ${form.remember ? "#7c3aed" : "rgba(96,51,148,0.25)"}`,
                      background: form.remember ? "#7c3aed" : "transparent",
                    }}
                  >
                    {form.remember && (
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                      >
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[13px]" style={{ color: "#9580b8" }}>
                  Remember me
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full flex items-center justify-center gap-2 h-[50px] text-white text-[14px] font-bold tracking-[.06em] uppercase transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed border-none cursor-pointer"
                style={{ background: brandGrad, borderRadius: "6px" }}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M21 12a9 9 0 11-6.219-8.56"
                        strokeLinecap="round"
                      />
                    </svg>
                    Authenticating...
                  </>
                ) : success ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    Access Granted
                  </>
                ) : (
                  <>
                    Initialize Session
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
