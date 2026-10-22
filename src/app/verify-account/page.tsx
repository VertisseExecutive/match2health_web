"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginStart, loginSuccess, loginFailure, logout } from "../../redux/slices/authSlice";
import { loginUser } from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function VerifyAccountPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedPlan = useAppSelector((state) => state.plan.selectedPlan);
  const auth = useAppSelector((state) => state.auth);
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Prefetch payment page for instant zero-lag transition
  useEffect(() => {
    router.prefetch("/payment-details");
  }, [router]);

  const fillHospitalCredentials = () => {
    setEmail("Joshita1920@gmail.com");
    setPassword("Test@123456");
    setLocalError(null);
    showToast("Hospital demo credentials filled", "info");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      const msg = "Please enter both email and password.";
      setLocalError(msg);
      showToast(msg, "error");
      return;
    }

    dispatch(loginStart());
    showToast("Verifying credentials with server...", "loading");

    try {
      const res = await loginUser(cleanEmail, cleanPassword);

      dispatch(
        loginSuccess({
          user: res.user,
          access: res.access,
          refresh: res.refresh,
        })
      );

      const roleDisplay = res.user.role ? res.user.role.toUpperCase() : "HOSPITAL";
      const msg = `Account verified (${roleDisplay}). Redirecting...`;
      setSuccessMessage(msg);
      showToast(msg, "success");

      setTimeout(() => {
        router.push("/payment-details");
      }, 700);
    } catch (err: any) {
      const msg = err.message || "Login failed. Please check your credentials.";
      setLocalError(msg);
      showToast(msg, "error");
      dispatch(loginFailure(msg));
    }
  };

  const handleContinueWithExisting = () => {
    showToast("Account already verified. Proceeding...", "success");
    router.push("/payment-details");
  };

  const handleSwitchAccount = () => {
    dispatch(logout());
    setEmail("");
    setPassword("");
    setLocalError(null);
    setSuccessMessage(null);
    showToast("Logged out. Please sign in with your account.", "info");
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="w-full border-b border-black/15 bg-white sticky top-0 z-30">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 md:px-12 h-[68px] sm:h-[75px] flex items-center justify-between gap-2">
          {/* Logo & Company Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-4 hover:opacity-90 transition-opacity min-w-0">
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
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-16 page-smooth-enter">
        <div className="w-full max-w-[700px] flex flex-col items-center">
          {/* Headings */}
          <div className="text-center w-full mb-6 sm:mb-8 px-2">
            <h1 className="text-2xl sm:text-[30px] md:text-[32.6px] font-bold text-black leading-tight tracking-[0.01em]">
              Verify Your Account
            </h1>
            <p className="text-sm sm:text-lg md:text-[22.6px] font-medium text-black/70 tracking-[0.01em] mt-2 sm:mt-3">
              {selectedPlan
                ? `Continue subscription for ${selectedPlan.range} Employees (${selectedPlan.price}${selectedPlan.billingCycle})`
                : "Please login to continue with your subscription"}
            </p>
          </div>

          {/* If already authenticated, show smooth active session card */}
          {auth.isAuthenticated && auth.user ? (
            <div className="w-full bg-[#F6FFF9] border-2 border-[#2D5F3F]/40 rounded-[12px] p-6 sm:p-8 flex flex-col gap-5 shadow-sm interactive-card">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#215935] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {auth.user.email?.charAt(0).toUpperCase() || "H"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#215935]">
                    Logged In ({auth.user.role || "Hospital"})
                  </span>
                  <span className="text-base sm:text-lg font-bold text-black truncate">
                    {auth.user.email}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleContinueWithExisting}
                  className="flex-1 h-[52px] sm:h-[56px] bg-[#215935] hover:bg-[#1a472a] active:scale-[0.99] text-white font-bold text-base sm:text-[18px] rounded-[8px] transition-all flex items-center justify-center gap-2 btn-spring cursor-pointer shadow-sm"
                >
                  <span>Continue to Payment</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  className="h-[52px] sm:h-[56px] px-5 border border-black/25 hover:border-black/50 text-black/80 hover:text-black font-semibold text-sm sm:text-base rounded-[8px] transition-all cursor-pointer bg-white"
                >
                  Switch Account
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 sm:gap-6">
              {/* Quick Fill Demo Helper Pill */}
              <div className="flex items-center justify-between bg-[#F0FFF6] border border-[#2D5F3F]/30 rounded-lg px-3.5 py-2 text-xs sm:text-sm">
                <span className="text-black/75 font-medium">Testing account?</span>
                <button
                  type="button"
                  onClick={fillHospitalCredentials}
                  className="text-[#215935] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Auto-fill Hospital Login</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Error Message */}
              {localError && (
                <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{localError}</span>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-sm sm:text-base font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{successMessage}</span>
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
                  className="w-full h-[54px] sm:h-[64px] bg-white rounded-[7px] flex items-center px-4 sm:px-5 gap-3 sm:gap-4 interactive-input focus-within:ring-2 focus-within:ring-[#215935]"
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
                  className="w-full h-[54px] sm:h-[64px] bg-white rounded-[7px] flex items-center px-4 sm:px-5 gap-3 sm:gap-4 interactive-input focus-within:ring-2 focus-within:ring-[#215935]"
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
                className="w-full h-[54px] sm:h-[60px] bg-[#215935] hover:bg-[#1a472a] disabled:opacity-85 active:scale-[0.99] text-white font-bold text-lg sm:text-[21.8px] tracking-[0.05em] rounded-[9.6px] shadow-[0px_4px_5px_rgba(0,0,0,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2.5 mt-2 btn-spring"
              >
                {auth.isLoading ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5 text-white flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        className="opacity-95"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          )}

          {/* Back to Plans Link */}
          <div className="w-full flex items-center gap-3 pt-4 sm:pt-6">
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
          <div className="w-full border-b border-black/18 pt-4 sm:pt-6" />

          {/* Security Guarantee */}
          <div className="flex items-center justify-center gap-2 text-black/60 pt-4">
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
        </div>
      </main>
    </div>
  );
}
