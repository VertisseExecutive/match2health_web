"use client";

import React, { Suspense } from "react";
import { AuthHeroBanner, AuthMobileLogo, AuthForgotPassword } from "../../components/auth";

/**
 * Screen: Forgot Password Page
 * Pixel-perfect implementation based on Figma specs (Frame 2006, Group 48, image 23)
 */
function ForgotPasswordContent() {
  return (
    <div className="min-h-screen w-full flex bg-[#F8F8F6] text-black font-sans overflow-x-hidden">
      {/* Left Column: Hero Banner with Lock & Envelope artwork (Desktop Only: 554px) */}
      <AuthHeroBanner
        imageSrc="/forget-password.png"
        tagline="Forgot Password"
        showLogo={false}
      />

      {/* Right Column: Interactive Forgot Password Container */}
      <main className="flex-1 w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 xl:px-16 py-8 sm:py-12 relative page-smooth-enter">
        <div className="w-full max-w-[480px] sm:max-w-[520px] flex flex-col items-center relative">
          {/* Mobile Header Logo (Visible on mobile/tablet when left hero banner is hidden) */}
          <AuthMobileLogo />

          {/* Forgot Password Component */}
          <AuthForgotPassword loginHref="/login" />
        </div>
      </main>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F8F6]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#215935]" />
        </div>
      }
    >
      <ForgotPasswordContent />
    </Suspense>
  );
}
