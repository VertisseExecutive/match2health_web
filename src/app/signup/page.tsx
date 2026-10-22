"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signupUser, SignupPayload, UserRole } from "../../services/auth";
import { useToast } from "../../context/ToastContext";
import { AuthHeroBanner, AuthMobileLogo, AuthSignup } from "../../components/auth";

/**
 * Screen 2: Create Account (Hospital / Candidate / Doctor)
 * Pixel-perfect implementation based on Figma SCREEN 2 specs
 */
function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") as UserRole | null;
  const initialRole: UserRole =
    roleParam === "hospital" || roleParam === "doctor" || roleParam === "candidate"
      ? roleParam
      : "hospital";

  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async (payload: SignupPayload) => {
    setIsLoading(true);
    setErrorMessage(null);
    showToast("Creating your account...", "loading");

    try {
      const res = await signupUser(payload);
      showToast(res.message || "Account created! Please verify your email.", "success");

      setTimeout(() => {
        router.push(
          `/verify-account?email=${encodeURIComponent(payload.email)}&role=${payload.role}&registered=true`
        );
      }, 700);
    } catch (err: any) {
      const msg = err.message || "Failed to create account. Please try again.";
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8F8F6] text-black font-sans overflow-x-hidden">
      {/* Left Column: Hero Banner with "Join MediCare Today!" Artwork (Desktop Only: 554px) */}
      <AuthHeroBanner
        imageSrc="/join medical today.png"
        tagline="Join MediCare Today!"
        showLogo={false}
      />

      {/* Right Column: Interactive Registration Container (Figma Frame 532) */}
      <main className="flex-1 w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 xl:px-12 py-6 sm:py-8 lg:py-10 relative page-smooth-enter">
        <div className="w-full max-w-[460px] sm:max-w-[500px] xl:max-w-[540px] flex flex-col items-center relative">
          {/* Back Chevron Icon Button (Figma Frame 600) */}
          <button
            type="button"
            onClick={() => router.back()}
            className="self-start sm:absolute sm:-left-10 lg:-left-12 sm:top-1 p-1.5 sm:p-2 rounded-full text-[#171717]/70 hover:text-[#171717] hover:bg-black/5 transition-colors cursor-pointer mb-2 sm:mb-0"
            aria-label="Go back"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
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

          {/* Form Header (Figma Frame 518) */}
          <div className="text-center w-full mb-4 sm:mb-5 lg:mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] font-semibold text-black tracking-tight leading-tight">
              Create Account
            </h1>
            <p className="text-sm sm:text-base lg:text-[18px] xl:text-[20px] font-medium text-black/70 mt-1 leading-snug">
              Fill in the details to be started
            </p>
          </div>

          {/* Signup Form Component (Figma Frame 2011) */}
          <AuthSignup
            onSubmit={handleSignup}
            isLoading={isLoading}
            errorMessage={errorMessage}
            role={initialRole}
            loginHref="/login"
          />
        </div>
      </main>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F8F6]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#215935]" />
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
