"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserRole, SignupPayload } from "../../services/auth/types";

interface AuthSignupProps {
  onSubmit: (payload: SignupPayload) => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string | null;
  role?: UserRole;
  loginHref?: string;
}

export function AuthSignup({
  onSubmit,
  isLoading = false,
  errorMessage = null,
  role = "hospital",
  loginHref = "/login",
}: AuthSignupProps) {
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const cleanName = fullName.trim();
    const cleanEmail = emailOrPhone.trim();
    const cleanPassword = password.trim();
    const cleanConfirm = confirmPassword.trim();
    const cleanCompany = companyName.trim();

    if (!cleanName) {
      setValidationError("Please enter your full name.");
      return;
    }

    if (!cleanEmail) {
      setValidationError("Please enter your email or phone number.");
      return;
    }

    if (role === "hospital" && !cleanCompany) {
      setValidationError("Please enter your company name.");
      return;
    }

    if (!cleanPassword) {
      setValidationError("Please enter your password.");
      return;
    }

    if (cleanPassword.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    if (cleanPassword !== cleanConfirm) {
      setValidationError("Password and confirm password do not match.");
      return;
    }

    if (!termsAccepted) {
      setValidationError("You must agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    await onSubmit({
      email: cleanEmail,
      password: cleanPassword,
      role: role as "candidate" | "doctor" | "hospital",
      username: cleanName,
      ...(role === "hospital" ? { company_name: cleanCompany } : {}),
    });
  };

  const activeError = validationError || errorMessage;

  return (
    <div className="w-full max-w-[460px] sm:max-w-[500px] xl:max-w-[540px] flex flex-col items-center">
      {/* Error Alert */}
      {activeError && (
        <div className="w-full mb-3 bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{activeError}</span>
        </div>
      )}

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5 sm:gap-3 xl:gap-3.5">
        {/* Field 1: Full Name */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs sm:text-[13px] md:text-sm font-medium text-black">
            Full Name
          </label>
          <div
            className="w-full h-11 sm:h-12 md:h-[50px] xl:h-[54px] bg-white flex items-center px-3.5 sm:px-4 md:px-5 gap-3 interactive-input"
            style={{
              borderRadius: "7.5px",
              border: "1.7px solid rgba(45, 95, 63, 0.6)",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
            }}
          >
            {/* Person Icon */}
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-[#2D5F3F]">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-full text-xs sm:text-sm md:text-base font-medium text-black placeholder:text-[#919191] bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Field 2: Email or Phone number */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs sm:text-[13px] md:text-sm font-medium text-black">
            Email or Phone number
          </label>
          <div
            className="w-full h-11 sm:h-12 md:h-[50px] xl:h-[54px] bg-white flex items-center px-3.5 sm:px-4 md:px-5 gap-3 interactive-input"
            style={{
              borderRadius: "7.5px",
              border: "1.7px solid rgba(45, 95, 63, 0.6)",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
            }}
          >
            {/* Mail Icon */}
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-black/70">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <input
              type="text"
              required
              placeholder="Enter email or phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full h-full text-xs sm:text-sm md:text-base font-medium text-black placeholder:text-[#919191] bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Field 3: Company Name (Hospital only) */}
        {role === "hospital" && (
          <div className="flex flex-col gap-1 w-full animate-fadeIn">
            <label className="text-xs sm:text-[13px] md:text-sm font-medium text-black">
              Company Name
            </label>
            <div
              className="w-full h-11 sm:h-12 md:h-[50px] xl:h-[54px] bg-white flex items-center px-3.5 sm:px-4 md:px-5 gap-3 interactive-input"
              style={{
                borderRadius: "7.5px",
                border: "1.7px solid rgba(45, 95, 63, 0.6)",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
              }}
            >
              {/* Building Icon */}
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-black/60">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                  <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
                  <path d="M10 6h4" />
                  <path d="M10 10h4" />
                  <path d="M10 14h4" />
                  <path d="M10 18h4" />
                </svg>
              </div>
              <input
                type="text"
                required={role === "hospital"}
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-full text-xs sm:text-sm md:text-base font-medium text-black placeholder:text-[#919191] bg-transparent focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Field 4: Password */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs sm:text-[13px] md:text-sm font-medium text-black">
            Password
          </label>
          <div
            className="w-full h-11 sm:h-12 md:h-[50px] xl:h-[54px] bg-white flex items-center px-3.5 sm:px-4 md:px-5 gap-3 interactive-input"
            style={{
              borderRadius: "7.5px",
              border: "1.7px solid rgba(45, 95, 63, 0.6)",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
            }}
          >
            {/* Lock Icon */}
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-black/60">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full text-xs sm:text-sm md:text-base font-medium text-black placeholder:text-[#919191] bg-transparent focus:outline-none"
            />
            {/* Eye Toggle Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-black/60 hover:text-black transition-colors cursor-pointer flex-shrink-0"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Field 5: Confirm Password */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs sm:text-[13px] md:text-sm font-medium text-black">
            Confirm Password
          </label>
          <div
            className="w-full h-11 sm:h-12 md:h-[50px] xl:h-[54px] bg-white flex items-center px-3.5 sm:px-4 md:px-5 gap-3 interactive-input"
            style={{
              borderRadius: "7.5px",
              border: "1.7px solid rgba(45, 95, 63, 0.6)",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
            }}
          >
            {/* Lock Icon */}
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-black/60">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              minLength={6}
              placeholder="Enter your confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-full text-xs sm:text-sm md:text-base font-medium text-black placeholder:text-[#919191] bg-transparent focus:outline-none"
            />
            {/* Eye Toggle Icon */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="p-1 text-black/60 hover:text-black transition-colors cursor-pointer flex-shrink-0"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? (
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="flex items-center gap-2.5 pt-1 select-none">
          <input
            id="terms-checkbox"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded border border-black/60 text-[#215935] cursor-pointer accent-[#215935] flex-shrink-0"
          />
          <label htmlFor="terms-checkbox" className="text-xs sm:text-[13px] md:text-sm font-medium text-black/75 cursor-pointer leading-tight">
            I agree to the{" "}
            <Link href="/terms" className="text-[#215935] font-semibold hover:underline">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#215935] font-semibold hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Sign Up Submit Button */}
        <div className="w-full flex justify-center pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full max-w-[420px] h-11 sm:h-12 md:h-[50px] xl:h-[54px] bg-[#215935] hover:bg-[#1a472a] disabled:opacity-75 active:scale-[0.99] text-white font-bold text-sm sm:text-base md:text-lg rounded-full shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 btn-spring"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </div>
      </form>

      {/* Already have an account? Login */}
      <div className="w-full flex items-center justify-center pt-4 sm:pt-5 text-xs sm:text-sm md:text-base font-medium text-black">
        <span>Already have an account?</span>&nbsp;
        <Link
          href={loginHref}
          className="text-[#215935] font-bold hover:underline transition-colors cursor-pointer"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
