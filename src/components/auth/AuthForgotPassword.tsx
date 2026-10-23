"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPassword } from "../../services/auth";
import { useToast } from "../../context/ToastContext";

interface AuthForgotPasswordProps {
  loginHref?: string;
}

/**
 * Forgot Password Form Component
 * Matches Figma specs: Title, Subtitle, Email input, Green action button ("Login"), and Back to Login link
 */
export function AuthForgotPassword({ loginHref = "/login" }: AuthForgotPasswordProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    showToast("Sending reset OTP...", "loading");

    try {
      const res = await forgotPassword(cleanEmail);
      showToast(res.message || "OTP sent successfully! Please check your email.", "success");

      setTimeout(() => {
        router.push(
          `/verify-otp?email=${encodeURIComponent(cleanEmail)}&flow=reset-password`
        );
      }, 700);
    } catch (err: any) {
      const msg = err.message || "Unable to send reset code. Please check your email.";
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] xl:max-w-[500px] flex flex-col items-start text-left">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-[34px] xl:text-[36px] font-bold text-black tracking-tight leading-tight">
        Forgot Password?
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-[17px] font-normal text-black/60 mt-2.5 sm:mt-3 leading-relaxed">
        No worries! Enter your registered email address and we&apos;ll send you an OTP to reset your password.
      </p>

      {/* Error Alert */}
      {errorMessage && (
        <div className="w-full mt-4 bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2">
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full mt-6 sm:mt-7 flex flex-col gap-5 sm:gap-6">
        {/* Email Address Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="forgot-email" className="text-sm sm:text-[15px] font-medium text-black">
            Email Address <span className="text-red-500 font-bold">*</span>
          </label>
          <div
            className="w-full h-11 sm:h-12 md:h-[50px] xl:h-[54px] bg-white flex items-center px-4 interactive-input"
            style={{
              borderRadius: "8px",
              border: "1.2px solid rgba(0, 0, 0, 0.35)",
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <input
              id="forgot-email"
              type="email"
              required
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full text-sm sm:text-base font-normal text-black placeholder:text-[#919191] bg-transparent focus:outline-none"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Action Button: Matches Figma button ("Login") */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 sm:h-12 md:h-[52px] xl:h-[56px] bg-[#215935] hover:bg-[#1a472a] disabled:opacity-70 active:scale-[0.99] text-white font-bold text-base sm:text-lg rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2.5 mt-1 btn-spring"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span>Sending OTP...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </button>

        {/* Back to Login Link */}
        <div className="w-full flex items-center justify-center pt-2">
          <Link
            href={loginHref}
            className="inline-flex items-center gap-2 text-[#215935] font-semibold text-sm sm:text-base hover:underline transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#215935]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
