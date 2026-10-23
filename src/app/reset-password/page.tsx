"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "../../services/auth";
import { useToast } from "../../context/ToastContext";
import { AuthHeroBanner, AuthMobileLogo } from "../../components/auth";

/**
 * Screen: Reset Password & Reset Password Successful
 * Pixel-perfect implementation based on Figma specs:
 * 1. Form state: Frame 2006, 2009, 1659, 559, 1660, 452, 2003 with image Reset-password.png
 * 2. Success state: Frame 2010, 1999, 1998, 1997, 452 with image success-fully.png
 */
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const tokenParam = searchParams.get("token") || "";
  const isSuccessParam = searchParams.get("success") === "true";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(isSuccessParam);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic Password Validation Checks matching Figma Frame 559
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPassword = password.trim();
    const cleanConfirm = confirmPassword.trim();

    if (!cleanPassword) {
      setErrorMessage("Please enter your new password.");
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecialChar) {
      setErrorMessage("Please fulfill all password requirements below.");
      return;
    }

    if (cleanPassword !== cleanConfirm) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    const emailParam = searchParams.get("email") || "";
    const email =
      emailParam ||
      (typeof window !== "undefined"
        ? sessionStorage.getItem("m2h_reset_email") || ""
        : "");

    // Retrieve reset token from param or session storage
    const resetToken =
      tokenParam ||
      (typeof window !== "undefined"
        ? sessionStorage.getItem("m2h_reset_token") || ""
        : "");

    if (!resetToken) {
      setErrorMessage("Verification session expired. Please verify your OTP again.");
      return;
    }

    setIsLoading(true);
    showToast("Updating password...", "loading");

    try {
      const res = await resetPassword({
        reset_token: resetToken,
        new_password: cleanPassword,
        email,
      });

      showToast(res.message || "Password updated successfully!", "success");

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("m2h_reset_token");
        sessionStorage.removeItem("m2h_reset_email");
      }

      // Smooth transition to Success state as shown in Figma SCREEN 1
      setIsSuccess(true);
    } catch (err: any) {
      const msg = err.message || "Failed to reset password. Please try again.";
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8F8F6] text-black font-sans overflow-x-hidden">
      {/* Left Column: Hero Banner (Switches between Reset-password.png and success-fully.png) */}
      <AuthHeroBanner
        imageSrc={isSuccess ? "/success-fully.png" : "/Reset-password.png"}
        tagline={isSuccess ? "Password Reset Successful!" : "Reset Password"}
        showLogo={false}
      />

      {/* Right Column: Interactive Container */}
      <main className="flex-1 w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 xl:px-16 py-8 sm:py-12 relative page-smooth-enter">
        {isSuccess ? (
          /* ========================================================================= */
          /* SUCCESS STATE: Figma Frame 2010 (width 553px, Frame 1999 / 1998 / 1997 / 452) */
          /* ========================================================================= */
          <div className="w-full max-w-[553px] flex flex-col items-start text-left relative animate-fade-in">
            {/* Mobile Header Logo */}
            <AuthMobileLogo />

            {/* Mobile Illustration Badge for screens where left banner is hidden */}
            <div className="lg:hidden w-full flex justify-center mb-6">
              <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden shadow-lg border-4 border-white bg-[#063824]">
                <Image
                  src="/success-fully.png"
                  alt="Password Reset Successful"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            {/* Frame 1998 & 1997: Headings Container (width 532.33px, gap 34.45px) */}
            <div className="w-full max-w-[532.33px] flex flex-col items-start text-left gap-4 sm:gap-6 md:gap-[34.45px] mb-8 sm:mb-12 md:mb-[70px]">
              {/* Password Reset Successful! (Figma: font-size 41px, line-height 52px, font-weight 600, color #000000) */}
              <h1 className="text-3xl sm:text-4xl md:text-[38px] xl:text-[41px] font-semibold text-black tracking-normal leading-[115%] sm:leading-[120%] xl:leading-[52px]">
                Password Reset<br />Successful!
              </h1>

              {/* Subtitle (Figma: font-size 27.56px, line-height 40px, font-weight 500, color rgba(0,0,0,0.6)) */}
              <p className="text-base sm:text-lg md:text-[22px] xl:text-[27.56px] font-medium text-black/60 leading-relaxed sm:leading-[135%] xl:leading-[40px] tracking-[0.01em] max-w-[532px]">
                Your password has been reset successfully. You can now login with your new password.
              </p>
            </div>

            {/* Frame 452: Go to Login Button (Figma: width 553px, height 72.35px, rounded 86.14px, bg #215935) */}
            <button
              type="button"
              onClick={() => router.push("/login")}
              style={{
                borderRadius: "86.14px",
              }}
              className="w-full max-w-[553px] h-12 sm:h-14 md:h-[64px] xl:h-[72.35px] bg-[#215935] hover:bg-[#1a472a] active:scale-[0.99] text-white font-semibold text-base sm:text-xl md:text-[22px] xl:text-[25.84px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-3 btn-spring tracking-[0.02em]"
            >
              <span>Go to Login</span>
            </button>
          </div>
        ) : (
          /* ========================================================================= */
          /* FORM STATE: Figma Frame 2009 (width 683px) */
          /* ========================================================================= */
          <div className="w-full max-w-[480px] sm:max-w-[560px] md:max-w-[628px] lg:max-w-[640px] flex flex-col items-start relative">
            {/* Mobile Header Logo (Visible on mobile/tablet when left hero is hidden) */}
            <AuthMobileLogo />

            {/* Header (Figma Frame 518: width 553px) */}
            <div className="w-full mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-[34px] xl:text-[35px] font-semibold text-black tracking-tight leading-[42px]">
                Reset Password
              </h1>
              <p className="text-base sm:text-lg md:text-[22px] xl:text-[25px] font-medium text-black/50 mt-1 sm:mt-1.5 leading-[31px]">
                Enter your new password
              </p>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="w-full mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form (Figma Frame 1993: gap 25px) */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 sm:gap-6">
              {/* New Password (Figma Frame 1659) */}
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="reset-new-password" className="text-sm sm:text-base md:text-[19px] font-medium text-black">
                  New Password
                </label>
                <div
                  className="w-full h-12 sm:h-13 md:h-[56px] xl:h-[62px] bg-white flex items-center px-4 sm:px-5 gap-3.5 interactive-input"
                  style={{
                    borderRadius: "6.3px",
                    border: "1.58px solid #2D5F3F",
                  }}
                >
                  {/* Lock Icon */}
                  <svg
                    className="w-5 h-5 text-black/70 flex-shrink-0"
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
                    id="reset-new-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-full text-sm sm:text-base md:text-[17.8px] font-normal text-black placeholder:text-black/50 bg-transparent focus:outline-none"
                  />
                  {/* Eye toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-black/60 hover:text-black p-1 cursor-pointer focus:outline-none flex-shrink-0"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirement Card (Figma Frame 559) */}
              <div
                className="w-full bg-white p-4 sm:p-5 flex flex-col gap-3.5"
                style={{
                  borderRadius: "15.6px",
                  border: "1.42px solid #2D5F3F",
                }}
              >
                <span className="text-base sm:text-lg md:text-[21px] font-semibold text-black">
                  Password must contain:
                </span>

                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {/* 1. At least 8 characters */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full flex-shrink-0 transition-colors ${
                        hasMinLength ? "bg-[#00B80C] shadow-[0px_0px_6px_rgba(0,184,12,0.4)]" : "bg-black/25"
                      }`}
                    />
                    <span className={`text-xs sm:text-sm md:text-[18px] font-medium leading-tight ${hasMinLength ? "text-black" : "text-black/60"}`}>
                      At least 8 characters
                    </span>
                  </div>

                  {/* 2. One uppercase letter */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full flex-shrink-0 transition-colors ${
                        hasUppercase ? "bg-[#00B80C] shadow-[0px_0px_6px_rgba(0,184,12,0.4)]" : "bg-black/25"
                      }`}
                    />
                    <span className={`text-xs sm:text-sm md:text-[18px] font-medium leading-tight ${hasUppercase ? "text-black" : "text-black/60"}`}>
                      One uppercase letter
                    </span>
                  </div>

                  {/* 3. One number */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full flex-shrink-0 transition-colors ${
                        hasNumber ? "bg-[#00B80C] shadow-[0px_0px_6px_rgba(0,184,12,0.4)]" : "bg-black/25"
                      }`}
                    />
                    <span className={`text-xs sm:text-sm md:text-[18px] font-medium leading-tight ${hasNumber ? "text-black" : "text-black/60"}`}>
                      One number
                    </span>
                  </div>

                  {/* 4. One special character */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full flex-shrink-0 transition-colors ${
                        hasSpecialChar ? "bg-[#00B80C] shadow-[0px_0px_6px_rgba(0,184,12,0.4)]" : "bg-black/25"
                      }`}
                    />
                    <span className={`text-xs sm:text-sm md:text-[18px] font-medium leading-tight ${hasSpecialChar ? "text-black" : "text-black/60"}`}>
                      One special character
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm Password (Figma Frame 1660) */}
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="reset-confirm-password" className="text-sm sm:text-base md:text-[19px] font-medium text-black">
                  Confirm Password
                </label>
                <div
                  className="w-full h-12 sm:h-13 md:h-[56px] xl:h-[62px] bg-white flex items-center px-4 sm:px-5 gap-3.5 interactive-input"
                  style={{
                    borderRadius: "6.3px",
                    border: "1.58px solid #2D5F3F",
                  }}
                >
                  {/* Lock Icon */}
                  <svg
                    className="w-5 h-5 text-black/70 flex-shrink-0"
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
                    id="reset-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Enter your confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-full text-sm sm:text-base md:text-[17.8px] font-normal text-black placeholder:text-black/50 bg-transparent focus:outline-none"
                  />
                  {/* Eye toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-black/60 hover:text-black p-1 cursor-pointer focus:outline-none flex-shrink-0"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button (Figma Frame 452: width 455px, height 60px, rounded 70.9px, bg #215935) */}
              <div className="w-full flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    borderRadius: "70.9px",
                  }}
                  className="w-full max-w-[455px] h-12 sm:h-13 md:h-[58px] xl:h-[60px] bg-[#215935] hover:bg-[#1a472a] disabled:opacity-70 active:scale-[0.99] text-white font-semibold text-base sm:text-lg md:text-[21px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 btn-spring tracking-[0.02em]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <span>Reset Password</span>
                  )}
                </button>
              </div>

              {/* Back to Login Link (Figma Frame 2003 / 599 / 2002) */}
              <div className="w-full flex items-center justify-center pt-1">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-[#2D5F3F] font-bold text-base sm:text-lg md:text-[22px] hover:underline transition-all cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 text-[#2D5F3F]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F8F6]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#215935]" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
