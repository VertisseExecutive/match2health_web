"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserRole, SignupPayload } from "../../services/auth/types";
import { SocialLoginButtons } from "./SocialLoginButtons";

interface AuthSignupProps {
  onSubmit: (payload: SignupPayload) => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string | null;
  initialRole?: UserRole;
  loginHref?: string;
}

export function AuthSignup({
  onSubmit,
  isLoading = false,
  errorMessage = null,
  initialRole = "doctor",
  loginHref = "/login",
}: AuthSignupProps) {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;

    await onSubmit({
      email: email.trim(),
      password: password.trim(),
      role: role as "candidate" | "doctor" | "hospital",
      username: fullName.trim(),
      ...(role === "hospital" ? { company_name: companyName.trim() || fullName.trim() } : {}),
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Role Selector Tabs (Candidate / Doctor / Hospital) */}
      <div className="w-full flex items-center justify-center p-1.5 bg-[#EAEAE6] rounded-[16px] gap-1.5">
        <button
          type="button"
          onClick={() => setRole("doctor")}
          className={`flex-1 py-2.5 sm:py-3 rounded-[12px] font-bold text-sm sm:text-base transition-all cursor-pointer ${
            role === "doctor"
              ? "bg-[#033320] text-white shadow-sm"
              : "text-black/70 hover:text-black"
          }`}
        >
          Doctor
        </button>
        <button
          type="button"
          onClick={() => setRole("hospital")}
          className={`flex-1 py-2.5 sm:py-3 rounded-[12px] font-bold text-sm sm:text-base transition-all cursor-pointer ${
            role === "hospital"
              ? "bg-[#033320] text-white shadow-sm"
              : "text-black/70 hover:text-black"
          }`}
        >
          Hospital
        </button>
        <button
          type="button"
          onClick={() => setRole("candidate")}
          className={`flex-1 py-2.5 sm:py-3 rounded-[12px] font-bold text-sm sm:text-base transition-all cursor-pointer ${
            role === "candidate"
              ? "bg-[#033320] text-white shadow-sm"
              : "text-black/70 hover:text-black"
          }`}
        >
          Candidate
        </button>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base font-medium flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 sm:gap-5">
        {/* Full Name / Contact Person */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm sm:text-base font-semibold text-black">
            {role === "hospital" ? "Contact Person Name" : "Full Name"}
          </label>
          <input
            type="text"
            required
            placeholder={role === "hospital" ? "e.g. Dr. John / Admin" : "e.g. Dr. Sarah Smith"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-[52px] sm:h-[58px] bg-white border border-black/20 rounded-[8px] px-4 text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-[#033320] transition-all"
          />
        </div>

        {/* Hospital / Company Name (Hospital role only) */}
        {role === "hospital" && (
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm sm:text-base font-semibold text-black">
              Hospital / Company Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. City General Hospital"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full h-[52px] sm:h-[58px] bg-white border border-black/20 rounded-[8px] px-4 text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-[#033320] transition-all"
            />
          </div>
        )}

        {/* Email Address */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm sm:text-base font-semibold text-black">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="e.g. name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[52px] sm:h-[58px] bg-white border border-black/20 rounded-[8px] px-4 text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-[#033320] transition-all"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm sm:text-base font-semibold text-black">
            Password
          </label>
          <div className="relative w-full h-[52px] sm:h-[58px]">
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full bg-white border border-black/20 rounded-[8px] px-4 pr-12 text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-[#033320] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/50 hover:text-black p-1 cursor-pointer"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <label className="flex items-start gap-2.5 cursor-pointer mt-1 select-none">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-black/30 text-[#033320] focus:ring-[#033320] cursor-pointer"
          />
          <span className="text-xs sm:text-sm text-black/75">
            I agree to the{" "}
            <Link href="/terms" className="text-[#033320] font-bold underline hover:opacity-85">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#033320] font-bold underline hover:opacity-85">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !termsAccepted}
          className="w-full h-[54px] sm:h-[60px] bg-[#033320] hover:bg-[#022416] disabled:opacity-75 active:scale-[0.99] text-white font-bold text-base sm:text-[18px] rounded-[10px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </button>
      </form>

      {/* Social Registration */}
      <div className="w-full flex flex-col items-center gap-4">
        <SocialLoginButtons />

        {/* Switch to Login */}
        <div className="text-center text-sm sm:text-base text-black/70 mt-2">
          Already have an account?{" "}
          <Link href={loginHref} className="text-[#033320] font-bold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
