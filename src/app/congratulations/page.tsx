"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../redux/hooks";

export default function CongratulationsPage() {
  const router = useRouter();
  const selectedPlan = useAppSelector((state) => state.plan.selectedPlan);
  const auth = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="w-full border-b border-black/15 bg-white sticky top-0 z-30">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 md:px-12 h-[68px] sm:h-[75px] flex items-center justify-between gap-2">
          {/* Logo & Company Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-4 hover:opacity-90 transition-opacity min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0">
              <Image
                src="/LogoSignet.png"
                alt="Medicare Hospitals"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-base sm:text-xl md:text-[22px] tracking-[0.03em] sm:tracking-[0.05em] text-[#171717] truncate">
              Medicare Hospitals
            </span>
          </Link>

          {/* Secure & Encrypted Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 text-black/65 text-xs sm:text-base md:text-[20px] font-medium flex-shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black/65 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="hidden xs:inline">Secure &amp; Encrypted</span>
            <span className="xs:hidden">Secure</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-14 page-smooth-enter">
        <div className="w-full max-w-[580px] flex flex-col items-center text-center">
          {/* Confetti & Success Checkmark Image with Pop-In animation */}
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] flex items-center justify-center mb-4 celebration-pop">
            <Image
              src="/congs.png"
              alt="Congratulations on activating your Medicare Hospitals subscription"
              width={500}
              height={221}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-[34px] font-bold text-black tracking-[0.02em] mb-3">
            Congratulations !
          </h1>
          <p className="text-base sm:text-xl font-medium text-black/70 mb-8 max-w-md leading-relaxed">
            Your Free Trial for{" "}
            <span className="font-bold text-black">
              {selectedPlan?.range ? `${selectedPlan.range} Employees` : "Medicare Hospitals"}
            </span>{" "}
            has been activated successfully.
          </p>

          {/* Features Card Box */}
          <div className="w-full bg-white rounded-[16px] border border-black/15 shadow-[0px_2px_4px_rgba(0,0,0,0.06)] p-6 sm:p-7 flex flex-col gap-4 text-left mb-8 interactive-card">
            {/* Item 1 */}
            <div className="flex items-center gap-3.5">
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                  <path
                    d="M4 10L8 14L16 5"
                    stroke="#009937"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[17px] sm:text-[18px] font-medium text-black">
                {selectedPlan?.trialText || "14-Day Free Trial Activated"}
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3.5">
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                  <path
                    d="M4 10L8 14L16 5"
                    stroke="#009937"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[17px] sm:text-[18px] font-medium text-black">
                All Premium Features Unlocked
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3.5">
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                  <path
                    d="M4 10L8 14L16 5"
                    stroke="#009937"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[17px] sm:text-[18px] font-medium text-black">
                No Charges Today
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-3.5">
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                  <path
                    d="M4 10L8 14L16 5"
                    stroke="#009937"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[17px] sm:text-[18px] font-medium text-black">
                Cancel Anytime Before Renewal
              </span>
            </div>
          </div>

          {/* Go to Dashboard Button */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full h-[56px] sm:h-[60px] bg-[#215935] hover:bg-[#1a472a] active:scale-[0.99] text-white font-bold text-lg sm:text-[21px] tracking-[0.05em] rounded-[9.6px] shadow-[0px_4px_5px_rgba(0,0,0,0.3)] transition-all cursor-pointer flex items-center justify-center mb-8 btn-spring"
          >
            Go to Dashboard
          </button>

          {/* Security Guarantee Footer */}
          <div className="flex items-center justify-center gap-2 text-black/60">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-black/70"
              viewBox="0 0 20 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="9" width="16" height="11" rx="2" />
              <path d="M5 9V6a5 5 0 0110 0v3" />
            </svg>
            <span className="text-xs sm:text-base font-medium tracking-[0.01em]">
              Your data is safe and secure
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
