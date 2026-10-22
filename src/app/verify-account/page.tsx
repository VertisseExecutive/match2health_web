"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import { loginUser } from "../../services/api";

export default function VerifyAccountPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedPlan = useAppSelector((state) => state.plan.selectedPlan);
  const auth = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    dispatch(loginStart());

    try {
      const res = await loginUser(email, password);

      dispatch(
        loginSuccess({
          user: res.user,
          access: res.access,
          refresh: res.refresh,
        })
      );

      // Warning if not hospital/company, but still proceed
      if (res.user.role !== "hospital" && res.user.role !== "company") {
        console.warn("Account is " + res.user.role + ". Subscriptions are for company/hospital accounts.");
      }

      router.push("/payment-details");
    } catch (err: any) {
      const msg = err.message || "Login failed. Please check your credentials.";
      setLocalError(msg);
      dispatch(loginFailure(msg));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="w-full border-b border-black/15 bg-white sticky top-0 z-30">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 md:px-12 h-[68px] sm:h-[75px] flex items-center justify-between gap-2">
          {/* Logo & Company Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-4 hover:opacity-95 transition-opacity min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0">
              <Image
                src="/LogoSignet.png"
                alt="Medicare Hospitals"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-base sm:text-xl md:text-[22px] tracking-[0.03em] sm:tracking-[0.05em] text-[#171717] truncate">
              Medicare Hospitals
            </span>
          </Link>

          {/* Secure & Encrypted Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 text-black/65 text-xs sm:text-base md:text-[20px] font-medium flex-shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black/65 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="hidden xs:inline">Secure &amp; Encrypted</span>
            <span className="xs:hidden">Secure</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-[700px] flex flex-col items-center">
          {/* Headings */}
          <div className="text-center w-full mb-6 sm:mb-8 px-2">
            <h1 className="text-2xl sm:text-[30px] md:text-[32.6px] font-bold text-black leading-tight tracking-[0.01em]">
              Verify Your Account
            </h1>
            <p className="text-sm sm:text-lg md:text-[22.6px] font-medium text-black/70 tracking-[0.01em] mt-2 sm:mt-3">
              Please login to continue with your subscription
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 sm:gap-6">
            {/* Error Message */}
            {localError && (
              <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base font-medium flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{localError}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="email"
                className="text-base sm:text-[19.9px] font-medium text-black"
              >
                Email Address
              </label>
              <div
                className="w-full h-[54px] sm:h-[64px] bg-white rounded-[7px] flex items-center px-4 sm:px-5 gap-3 sm:gap-4 transition-all focus-within:ring-2 focus-within:ring-[#215935]"
                style={{
                  border: "1.72px solid rgba(45, 95, 63, 0.25)",
                  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* Envelope Mail Icon */}
                <svg
                  className="w-5 h-5 text-black/70 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full text-sm sm:text-[18.1px] font-medium text-black placeholder:text-black/60 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="password"
                className="text-base sm:text-[19.9px] font-medium text-black"
              >
                Password
              </label>
              <div
                className="w-full h-[54px] sm:h-[64px] bg-white rounded-[7px] flex items-center px-4 sm:px-5 gap-3 sm:gap-4 transition-all focus-within:ring-2 focus-within:ring-[#215935]"
                style={{
                  border: "1.72px solid rgba(45, 95, 63, 0.25)",
                  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* Lock Icon */}
                <svg
                  className="w-5 h-5 text-black/50 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full text-sm sm:text-[18.1px] font-medium text-black placeholder:text-black/60 bg-transparent focus:outline-none"
                />
                {/* Eye Toggle Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-black/65 hover:text-black focus:outline-none p-1 flex-shrink-0 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-0.5">
              <Link
                href="/forgot-password"
                className="text-sm sm:text-base md:text-[19.4px] font-semibold text-[#215935] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={auth.isLoading}
              className="w-full h-[54px] sm:h-[60px] bg-[#215935] hover:bg-[#1a472a] active:scale-[0.99] text-white font-bold text-lg sm:text-[21.8px] tracking-[0.05em] rounded-[9.6px] shadow-[0px_4px_5px_rgba(0,0,0,0.3)] transition-all cursor-pointer flex items-center justify-center mt-2"
            >
              {auth.isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Back to Plans Link */}
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/"
                className="flex items-center gap-2 text-[#2D5F3F] text-base sm:text-[19px] font-semibold tracking-[0.02em] hover:underline"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Back to Plans</span>
              </Link>
            </div>

            {/* Bottom Border Divider */}
            <div className="w-full border-b border-black/18 pt-2 sm:pt-4" />

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-black/60 pt-1">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-black/70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-xs sm:text-base md:text-[17.8px] font-medium tracking-[0.01em]">
                Your data is safe and secure
              </span>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
