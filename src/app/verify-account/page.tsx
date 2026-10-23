"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthHeroBanner, AuthMobileLogo, AuthOtpVerification } from "../../components/auth";

/**
 * Screen 4: OTP Verification Page (Hospital / Candidate / Doctor)
 * Dynamically handles both:
 * 1. "Verify Your Account" (Signup / Create Account flow)
 * 2. "Verify OTP" (Forgot Password flow)
 */
function VerifyAccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "info@apollohospital.com";
  const roleParam = searchParams.get("role") || "hospital";
  const flowParam = searchParams.get("flow");

  const isForgotFlow =
    flowParam === "forgot" ||
    flowParam === "forgot-password" ||
    flowParam === "reset-password" ||
    flowParam === "reset";

  const title = isForgotFlow ? "Verify OTP" : "Verify Your Account";
  const subtitlePrefix = isForgotFlow
    ? "Enter the 6-digit code sent to"
    : "We have 6-digit OTP to";

  return (
    <div className="min-h-screen w-full flex bg-[#F8F8F6] text-black font-sans overflow-x-hidden">
      {/* Left Column: Hero Banner with "Verify Your Account" Envelope Artwork (Desktop Only: 554px) */}
      <AuthHeroBanner
        imageSrc="/verify otp image.png"
        tagline={title}
        showLogo={false}
      />

      {/* Right Column: Interactive OTP Verification Container (Figma Frame 532: width 734px) */}
      <main className="flex-1 w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 xl:px-16 py-8 sm:py-12 relative page-smooth-enter">
        <div className="w-full max-w-[734px] flex flex-col items-center relative">
          {/* Back Chevron Icon Button (Figma Frame 602) */}
          <button
            type="button"
            onClick={() => router.back()}
            className="self-start sm:absolute sm:-left-12 lg:-left-16 xl:-left-20 sm:top-1 p-2 rounded-full text-[#171717]/70 hover:text-[#171717] hover:bg-black/5 transition-colors cursor-pointer mb-4 sm:mb-0"
            aria-label="Go back"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Mobile Header Logo (Visible only on mobile/tablet when left hero is hidden) */}
          <AuthMobileLogo />

          {/* Form Header (Figma Frame 518: width 734px, gap 22.58px) */}
          <div className="text-center w-full mb-6 sm:mb-8 md:mb-10 xl:mb-[40px]">
            {/* Title: 'Verify OTP' (Forgot) or 'Verify Your Account' (Signup) */}
            <h1 className="text-2xl sm:text-3xl md:text-[34px] xl:text-[38px] font-semibold text-black tracking-tight leading-[120%] xl:leading-[46px]">
              {title}
            </h1>

            {/* Subtitle: 'Enter the 6-digit code sent to' (Forgot) or 'We have 6-digit OTP to' (Signup) */}
            <div className="text-base sm:text-xl md:text-[22px] xl:text-[26px] font-medium text-black/55 mt-2 sm:mt-3 leading-snug xl:leading-[38px]">
              <span>{subtitlePrefix}</span>
              <div className="text-[#215935] font-semibold break-all mt-0.5">
                {emailParam}
              </div>
            </div>
          </div>

          {/* 6-Digit OTP Verification Form (Figma Frames 535, 523, 452, 531) */}
          <AuthOtpVerification
            initialEmail={emailParam}
            role={roleParam}
            flow={isForgotFlow ? "forgot" : "signup"}
            successRedirectHref={
              isForgotFlow
                ? undefined // handled internally to go to reset-password with reset_token
                : roleParam === "hospital"
                ? "/plans"
                : "/plans"
            }
          />
        </div>
      </main>
    </div>
  );
}

export default function VerifyAccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F8F6]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#215935]" />
        </div>
      }
    >
      <VerifyAccountContent />
    </Suspense>
  );
}
