"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SocialLoginButtons } from "./SocialLoginButtons";

interface AuthLoginProps {
  onSubmit: (emailOrPhone: string, password: string) => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string | null;
  signUpHref?: string;
  forgotPasswordHref?: string;
}

/**
 * Screen 1: Login Form Component
 * Matches Figma Frame 532 specifications with fluid responsive scaling
 */
export const AuthLogin: React.FC<AuthLoginProps> = ({
  onSubmit,
  isLoading = false,
  errorMessage = null,
  signUpHref = "/signup",
  forgotPasswordHref = "/forgot-password",
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(emailOrPhone, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[460px] sm:max-w-[500px] xl:max-w-[540px] flex flex-col gap-3.5 sm:gap-4 xl:gap-4.5">
      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Email or Phone Field (Figma Frame 543) */}
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="emailOrPhone"
          className="text-xs sm:text-[13px] md:text-sm font-medium text-black"
        >
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
          {/* Envelope Icon */}
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black/70 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <input
            id="emailOrPhone"
            type="text"
            required
            placeholder="Enter email or phone number"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full h-full text-xs sm:text-sm md:text-base font-medium text-black placeholder:text-[#919191] bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Password Field (Figma Frame 544) */}
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="password"
          className="text-xs sm:text-[13px] md:text-sm font-medium text-black"
        >
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
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black/60 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
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
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
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
                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
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

      {/* Remember Me & Forgot Password Row (Figma Frame 525) */}
      <div className="flex items-center justify-between w-full pt-1">
        {/* Remember me (Frame 523) */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border border-black/60 text-[#215935] cursor-pointer accent-[#215935]"
          />
          <span className="text-xs sm:text-[13px] md:text-sm font-medium text-black">
            Remember me
          </span>
        </label>

        {/* Forgot Password (Frame 524) */}
        <Link
          href={forgotPasswordHref}
          className="text-xs sm:text-[13px] md:text-sm font-semibold text-[#215935] hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button (Figma Frame 451) */}
      <div className="w-full flex justify-center pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full max-w-[420px] h-11 sm:h-12 md:h-[50px] xl:h-[54px] bg-[#215935] hover:bg-[#1a472a] disabled:opacity-75 active:scale-[0.99] text-white font-bold text-sm sm:text-base md:text-lg rounded-full shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 btn-spring"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin w-4 h-4 sm:w-5 sm:h-5 text-white"
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
              <span>Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
      </div>

      {/* Social Logins */}
      <SocialLoginButtons />

      {/* Don't have an account? Sign Up (Figma Frame 531) */}
      <div className="w-full text-center pt-2">
        <span className="text-xs sm:text-sm md:text-base font-medium text-black">
          Don’t have an account?{" "}
          <Link href={signUpHref} className="font-bold text-[#215935] hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </form>
  );
};
