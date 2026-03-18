"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home",     href: "/"         },
  { label: "Features", href: "/features", badge: "New" },
  { label: "Pricing",  href: "/pricing"  },
  { label: "About",    href: "/about"    },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-black/5 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className=" z-0 max-w-6xl mx-auto px-8 flex items-center justify-between" style={{ height: "68px" }}>

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group no-underline -ml-5">
         <Image            src="/We_logo.svg.png"
            alt="Logo"
            width={45}
            height={32}
          />
          
          </Link>

          {/* ── Desktop Links ── */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map(({ label, href, badge }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 no-underline transition-all duration-150"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#603394";
                    e.currentTarget.style.backgroundColor = "rgba(96,51,148,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  {label}
                  {badge && (
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white leading-none"
                      style={{ background: "linear-gradient(to right, #603394, #ec4899)" }}
                    >
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop Actions ── */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 no-underline transition-all duration-150"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#603394";
                e.currentTarget.style.color = "#603394";
                e.currentTarget.style.backgroundColor = "rgba(96,51,148,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.color = "";
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="relative px-4 py-2 rounded-xl text-sm font-bold text-white no-underline overflow-hidden hover:opacity-90 hover:-translate-y-px transition-all duration-200"
              style={{
                background: "linear-gradient(to right, #603394, #8b5cf6, #ec4899)",
                boxShadow: "0 4px 14px rgba(96,51,148,0.3)",
              }}
            >
              <span className="relative z-10">Get started →</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors duration-150"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(96,51,148,0.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
          >
            <span className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-300 origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-300 origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>

        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden fixed top-[68px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-xl transition-all duration-200 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-5 pt-3 pb-5">
          <ul className="list-none m-0 p-0 mb-4 flex flex-col gap-0.5">
            {navLinks.map(({ label, href, badge }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 no-underline transition-all duration-150"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(96,51,148,0.06)";
                    e.currentTarget.style.color = "#603394";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.color = "";
                  }}
                >
                  {label}
                  {badge && (
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white leading-none"
                      style={{ background: "linear-gradient(to right, #603394, #ec4899)" }}
                    >
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 no-underline transition-all duration-150"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#603394";
                e.currentTarget.style.color = "#603394";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.color = "";
              }}
            >
              Sign in
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="relative w-full text-center px-4 py-3 rounded-xl text-sm font-bold text-white no-underline overflow-hidden hover:opacity-90 transition-all duration-150"
              style={{ background: "linear-gradient(to right, #603394, #8b5cf6, #ec4899)" }}
            >
              <span className="relative z-10">Get started →</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}