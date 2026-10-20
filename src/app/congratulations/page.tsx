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
          <Link href="/" className="flex items-center gap-2.5 sm:gap-4 hover:opacity-95 transition-opacity min-w-0">
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
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-14">
        <div className="w-full max-w-[580px] flex flex-col items-center text-center">
          {/* Confetti & Success Checkmark Icon */}
          <div className="relative w-[190px] h-[160px] sm:w-[220px] sm:h-[180px] flex items-center justify-center mb-4">
            <svg viewBox="0 0 220 180" className="w-full h-full" fill="none">
              {/* Confetti particles */}
              {/* Yellow ribbon top-left */}
              <path
                d="M38 35C41 33 45 37 42 40C39 43 35 37 38 35Z"
                fill="#FBBF24"
              />
              <path
                d="M45 42C48 40 52 44 49 47C46 50 42 44 45 42Z"
                fill="#F59E0B"
              />
              {/* Orange ribbon top-right */}
              <path
                d="M172 32C175 30 179 34 176 37C173 40 169 34 172 32Z"
                fill="#F97316"
              />
              <path
                d="M179 39C182 37 186 41 183 44C180 47 176 41 179 39Z"
                fill="#EA580C"
              />

              {/* Blue diamond left */}
              <rect
                x="32"
                y="58"
                width="7"
                height="7"
                transform="rotate(25 32 58)"
                fill="#38BDF8"
              />
              {/* Red / pink dot */}
              <circle cx="48" cy="78" r="4.5" fill="#FB7185" />
              {/* Green diamond right */}
              <rect
                x="175"
                y="52"
                width="6.5"
                height="6.5"
                transform="rotate(45 175 52)"
                fill="#34D399"
              />
              {/* Teal diamond right */}
              <rect
                x="192"
                y="84"
                width="7"
                height="7"
                transform="rotate(15 192 84)"
                fill="#2DD4BF"
              />
              {/* Yellow star / spark right */}
              <circle cx="180" cy="68" r="3.5" fill="#FBBF24" />
              {/* Soft dots around */}
              <circle cx="36" cy="100" r="2.5" fill="#60A5FA" />
              <circle cx="166" cy="115" r="3" fill="#6EE7B7" />

              {/* Center Green Badge */}
              <circle
                cx="110"
                cy="90"
                r="46"
                stroke="#10B981"
                strokeWidth="11"
                strokeOpacity="0.3"
              />
              <circle
                cx="110"
                cy="90"
                r="46"
                stroke="#047857"
                strokeWidth="8"
              />
              <circle cx="110" cy="90" r="42" fill="#FFFFFF" />

              {/* Checkmark */}
              <path
                d="M93 91L104 102L127 79"
                stroke="#008530"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-[34px] font-bold text-black tracking-[0.02em] mb-3">
            Congratulations !
          </h1>
          <p className="text-base sm:text-xl font-medium text-black/70 mb-8 max-w-md leading-relaxed">
            Your Premium Free Trial has been activated successfully.
          </p>

          {/* Features Card Box */}
          <div className="w-full bg-white rounded-[16px] border border-black/15 shadow-[0px_2px_4px_rgba(0,0,0,0.06)] p-6 sm:p-7 flex flex-col gap-4 text-left mb-8">
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
                {selectedPlan?.trialText || "30-Day Free Trial Activated"}
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
                Cancel Anytime
              </span>
            </div>
          </div>

          {/* Go to Dashboard Button */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full h-[56px] sm:h-[60px] bg-[#215935] hover:bg-[#1a472a] active:scale-[0.99] text-white font-bold text-lg sm:text-[21px] tracking-[0.05em] rounded-[9.6px] shadow-[0px_4px_5px_rgba(0,0,0,0.3)] transition-all cursor-pointer flex items-center justify-center mb-8"
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
