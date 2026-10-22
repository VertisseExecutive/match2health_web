"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signupUser, SignupPayload, UserRole } from "../../services/auth";
import { useToast } from "../../context/ToastContext";
import { AuthHeroBanner, AuthHeader, AuthSignup } from "../../components/auth";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") as UserRole | null;
  const initialRole: UserRole =
    roleParam === "hospital" || roleParam === "doctor" || roleParam === "candidate"
      ? roleParam
      : "doctor";

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
      {/* Left Column: Hero Banner with Doctor Illustration (Desktop Only) */}
      <AuthHeroBanner />

      {/* Right Column: Signup Container */}
      <main className="flex-1 w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 py-8 sm:py-12 relative page-smooth-enter">
        <div className="w-full max-w-[644px] flex flex-col items-center">
          {/* Header Component */}
          <AuthHeader
            title="Create an Account"
            subtitle="Join the healthcare network where professionals and hospitals connect."
            backHref="/"
          />

          {/* Signup Form Component (Ready for user's Figma UI injection) */}
          <AuthSignup
            onSubmit={handleSignup}
            isLoading={isLoading}
            errorMessage={errorMessage}
            initialRole={initialRole}
            loginHref="/login"
          />
        </div>
      </main>
    </div>
  );
}
