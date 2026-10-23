"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtp, resendOtp, verifyForgotOtp, forgotPassword } from "../../services/auth";
import { useToast } from "../../context/ToastContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginSuccess } from "../../redux/slices/authSlice";

interface AuthOtpVerificationProps {
  /** Optional pre-filled email from signup/query param */
  initialEmail?: string;
  /** Role of user */
  role?: string;
  /** Verification flow: 'signup' (create account) or 'forgot' (forgot password) */
  flow?: "signup" | "forgot";
  /** Destination after successful verification */
  successRedirectHref?: string;
}

/**
 * Screen 4: OTP Verification Component (Hospital / Doctor / Candidate)
 * Handles both "Create Account" OTP and "Forgot Password" OTP dynamically.
 * Features auto-submission on 6th digit, wrong OTP shake + reset & auto-focus first box,
 * and seamless keyboard tracking across input fields.
 */
export function AuthOtpVerification({
  initialEmail,
  role = "hospital",
  flow,
  successRedirectHref,
}: AuthOtpVerificationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const selectedPlan = useAppSelector((state) => state.plan.selectedPlan);
  const { showToast } = useToast();

  const flowParam = searchParams.get("flow");
  const isForgotFlow =
    flow === "forgot" ||
    flowParam === "forgot" ||
    flowParam === "forgot-password" ||
    flowParam === "reset-password" ||
    flowParam === "reset";

  const emailParam = searchParams.get("email");
  const email = (emailParam || initialEmail || "info@apollohospital.com").trim();

  // 6 OTP digit inputs
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer: 45 seconds countdown matching Figma Frame 523 ("Resend OTP in 00:45")
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Focus the first input on initial mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Execute OTP Verification (called manually or automatically when 6th digit is typed)
  const executeVerification = useCallback(
    async (codeToVerify: string) => {
      if (isVerifying) return;
      if (codeToVerify.length < 6) {
        setErrorMessage("Please enter the complete 6-digit verification code.");
        return;
      }

      setIsVerifying(true);
      setErrorMessage(null);
      setHasError(false);
      showToast("Verifying code...", "loading");

      try {
        if (isForgotFlow) {
          // ==========================================
          // 1. FORGOT PASSWORD OTP VERIFICATION FLOW
          // ==========================================
          const res = await verifyForgotOtp(email, codeToVerify);
          showToast(res.message || "Code verified successfully!", "success");

          if (res.reset_token && typeof window !== "undefined") {
            sessionStorage.setItem("m2h_reset_token", res.reset_token);
            sessionStorage.setItem("m2h_reset_email", email);
          }

          setTimeout(() => {
            if (successRedirectHref) {
              router.push(successRedirectHref);
            } else {
              router.push(
                `/reset-password?token=${encodeURIComponent(
                  res.reset_token || ""
                )}&email=${encodeURIComponent(email)}`
              );
            }
          }, 700);
        } else {
          // ==========================================
          // 2. SIGNUP / CREATE ACCOUNT OTP VERIFICATION FLOW
          // ==========================================
          const res = await verifyOtp({
            email,
            otp: codeToVerify,
          });

          if (res.access && res.user) {
            dispatch(
              loginSuccess({
                user: res.user,
                access: res.access,
                refresh: res.refresh || "",
              })
            );
          }

          showToast("Account verified successfully!", "success");

          setTimeout(() => {
            if (successRedirectHref) {
              router.push(successRedirectHref);
            } else {
              const userRole = res.user?.role?.toLowerCase() || role?.toLowerCase() || "hospital";
              router.push(`/dashboard?role=${encodeURIComponent(userRole)}`);
            }
          }, 700);
        }
      } catch (err: any) {
        const msg = err.message || "Invalid or expired verification code.";
        setErrorMessage(msg);
        showToast(msg, "error");

        // 1. Trigger error shake & red borders
        setHasError(true);
        setTimeout(() => setHasError(false), 650);

        // 2. Clear all OTP input fields
        setOtp(["", "", "", "", "", ""]);

        // 3. Automatically redirect cursor back to the FIRST box
        setTimeout(() => {
          inputRefs.current[0]?.focus();
          inputRefs.current[0]?.select();
        }, 80);
      } finally {
        setIsVerifying(false);
      }
    },
    [dispatch, email, isForgotFlow, isVerifying, role, router, selectedPlan, showToast, successRedirectHref]
  );

  // Handle single digit input with auto-advance and auto-submit
  const handleChange = (index: number, value: string) => {
    setErrorMessage(null);
    setHasError(false);

    const cleaned = value.replace(/\D/g, "");

    if (!cleaned) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    // Pick latest typed digit
    const char = cleaned.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto-advance to the next input box
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }

    // Auto-submit immediately once all 6 digits are filled
    const fullCode = newOtp.join("");
    if (fullCode.length === 6 && newOtp.every((digit) => digit !== "")) {
      executeVerification(fullCode);
    }
  };

  // Enhanced keyboard navigation (Backspace & Arrow keys)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        e.preventDefault();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.select();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  // Handle paste 6-digit code with instant auto-submit
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setHasError(false);

    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);

    if (pastedData.length === 6) {
      executeVerification(pastedData);
    } else {
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  // Resend OTP API call (calls forgotPassword for forgot flow, resendOtp for signup flow)
  const handleResendOtp = async () => {
    if (!canResend && timeLeft > 0) {
      showToast(`Please wait ${timeLeft}s before resending code.`, "info");
      return;
    }

    setIsResending(true);
    setErrorMessage(null);
    setHasError(false);
    showToast("Resending verification code...", "loading");

    try {
      if (isForgotFlow) {
        await forgotPassword(email);
        showToast("Reset code resent successfully!", "success");
      } else {
        await resendOtp(email);
        showToast("Verification code resent successfully!", "success");
      }

      setTimeLeft(45);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 50);
    } catch (err: any) {
      const msg = err.message || "Failed to resend code. Please try again.";
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setIsResending(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeVerification(otp.join(""));
  };

  // Format mm:ss
  const formattedSeconds = String(timeLeft % 60).padStart(2, "0");
  const formattedMinutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const timerDisplay = `${formattedMinutes}:${formattedSeconds}`;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Error Alert */}
      {errorMessage && (
        <div className="w-full max-w-[604px] mb-4 sm:mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2">
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

      {/* Main Verification Form (Figma Frames 535, 523, 452, 531) */}
      <form onSubmit={handleManualSubmit} className="w-full flex flex-col items-center gap-5 sm:gap-7 md:gap-8 xl:gap-[36px]">
        {/* Frame 535: 6 OTP Input Boxes with Auto-Tracking and Error Shake */}
        <div
          className={`w-full max-w-[632px] flex items-center justify-between gap-2 sm:gap-3.5 md:gap-5 xl:gap-[30px] ${
            hasError ? "animate-shake" : ""
          }`}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              disabled={isVerifying}
              onFocus={(e) => e.target.select()}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] xl:w-[80.2px] xl:h-[80.2px] bg-white text-center text-xl sm:text-2xl md:text-3xl xl:text-[34px] font-bold text-black focus:outline-none transition-all shadow-xs caret-[#215935] flex-shrink-0 cursor-text select-all ${
                hasError
                  ? "border-[2px] border-red-500 bg-red-50/20 text-red-600 ring-2 ring-red-400/20"
                  : digit
                  ? "border-[2px] border-[#215935] bg-white ring-1 ring-[#215935]/20"
                  : "border-[1.88px] border-black focus:border-[#215935] focus:ring-2 focus:ring-[#215935]/25"
              }`}
              style={{
                borderRadius: "9.41px",
              }}
              aria-label={`OTP Digit ${index + 1}`}
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {/* Resend OTP in 00:45 (Figma Frame 523) */}
        <div className="text-center font-medium text-black/70 text-base sm:text-lg md:text-[20px] xl:text-[23px] leading-[140%]">
          <span>Resend OTP in </span>
          <span className="text-[#215935] font-bold tracking-wide">
            {timerDisplay}
          </span>
        </div>

        {/* Didn’t receive the code? Resend OTP (Placed right above button as per design) */}
        <div className="text-center text-sm sm:text-base md:text-[18px] xl:text-[21px] font-medium text-black tracking-[0.01em]">
          <span>Didn’t receive the code? </span>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending || (!canResend && timeLeft > 0)}
            className="text-[#215935] font-bold hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer inline-flex items-center gap-1"
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </div>

        {/* Verify & Continue Button (Figma Frame 452) */}
        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={isVerifying || otp.join("").length < 6}
            style={{
              borderRadius: "94.1px",
            }}
            className="w-full max-w-[604px] h-12 sm:h-14 md:h-[64px] lg:h-[72px] xl:h-[78px] bg-[#215935] hover:bg-[#1a472a] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] text-white font-bold text-base sm:text-xl md:text-[23px] lg:text-[26px] xl:text-[28px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-3 btn-spring tracking-[0.02em]"
          >
            {isVerifying ? (
              <>
                <svg className="animate-spin w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify &amp; Continue</span>
            )}
          </button>
        </div>

        {/* Back to Login link (Shown for Forgot Password flow or general navigation) */}
        <div className="text-center pt-1">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[#215935] font-bold text-sm sm:text-base md:text-[17px] hover:underline transition-all cursor-pointer"
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
