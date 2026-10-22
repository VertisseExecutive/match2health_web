"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"doctor" | "hospital" | null>(null);

  const handleRoleSelect = (role: "doctor" | "hospital") => {
    setSelectedRole(role);
    if (role === "hospital") {
      router.push("/plans");
    } else {
      router.push("/verify-account?role=doctor");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden font-sans">
      {/* Live Video Background from App */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="/welcome.mp4" type="video/mp4" />
        </video>
        {/* Subtle atmospheric vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Main Content Container (Figma Frame 597) */}
      <main className="w-full max-w-[950px] mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center gap-7 sm:gap-8 z-10 page-smooth-enter">
        {/* Top Section: Logos & Headings (Frame 596 / Frame 590) */}
        <div className="w-full flex flex-col items-center gap-5 sm:gap-6 text-center">
          {/* LogoSignet (Frame 512) */}
          <div className="relative w-[140px] h-[140px] sm:w-[175px] sm:h-[175px] md:w-[198px] md:h-[198px] flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src="/LogoSignet.png"
              alt="Match2Health Logo Signet"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* LogoFont + Divider + Slogan Stack (Frame 511 & Frame 510) */}
          <div className="flex flex-col items-center justify-center w-full max-w-[382px] gap-2 px-2">
            {/* LogoFont (match2health text) */}
            <div className="relative w-[280px] sm:w-[341px] h-[56px] sm:h-[68px]">
              <Image
                src="/LogoFont.png"
                alt="match2health"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Divider line */}
            <div className="relative w-full max-w-[382px] h-[16px] sm:h-[23px] -mt-1 sm:-mt-1.5">
              <Image
                src="/Divider.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Slogan: healthcare recruitment */}
            <div className="relative w-full max-w-[382px] h-[18px] sm:h-[21px] -mt-1 sm:-mt-1.5">
              <Image
                src="/Slogan.png"
                alt="healthcare recruitment"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Welcome Titles (Frame 223 / Frame 222) */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 max-w-[720px] px-2 mt-1 sm:mt-2">
            <h1 className="text-2xl sm:text-[32px] md:text-[35px] font-semibold text-[#004218] tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
              Welcome to match2health
            </h1>
            <p className="text-base sm:text-xl md:text-[24px] font-normal text-[#00461A] leading-relaxed tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
              Where the right healthcare expert meets the right company
            </p>
          </div>
        </div>

        {/* Divider 1: "Select your role to get started" (Frame 592) */}
        <div className="w-full max-w-[886px] flex items-center justify-center gap-3 sm:gap-6 my-1">
          <div className="flex-1 max-w-[140px] sm:max-w-[200px] h-[0px] border-t-2 border-black/25" />
          <span className="text-sm sm:text-lg md:text-[21px] font-semibold text-[#004218]/90 tracking-wide text-center whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
            Select your role to get started
          </span>
          <div className="flex-1 max-w-[140px] sm:max-w-[200px] h-[0px] border-t-2 border-black/25" />
        </div>

        {/* Role Cards: Doctor & Hospital (Frame 68 / Frame 450 & 451) */}
        <div className="w-full max-w-[949px] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 px-2">
          {/* Doctor Card */}
          <button
            type="button"
            onClick={() => handleRoleSelect("doctor")}
            className="w-full sm:w-[428px] h-[100px] sm:h-[108px] bg-[#215935] hover:bg-[#1a472a] text-white rounded-[24.4px] shadow-[0px_4.3px_2.8px_rgba(0,0,0,0.25)] hover:shadow-xl transition-all duration-200 px-6 sm:px-9 py-4 flex flex-col justify-center items-start text-left cursor-pointer active:scale-[0.98] group"
          >
            <span className="text-xl sm:text-[25px] font-extrabold text-white leading-tight tracking-wide group-hover:translate-x-0.5 transition-transform">
              I’m a Doctor
            </span>
            <span className="text-sm sm:text-[17px] md:text-[18px] font-medium text-white/85 leading-snug mt-1.5">
              Find roles that match your specialty.
            </span>
          </button>

          {/* Hospital Card */}
          <button
            type="button"
            onClick={() => handleRoleSelect("hospital")}
            className="w-full sm:w-[428px] h-[100px] sm:h-[108px] bg-[#215935] hover:bg-[#1a472a] text-white rounded-[24.4px] shadow-[0px_4.3px_2.8px_rgba(0,0,0,0.25)] hover:shadow-xl transition-all duration-200 px-6 sm:px-9 py-4 flex flex-col justify-center items-start text-left cursor-pointer active:scale-[0.98] group"
          >
            <span className="text-xl sm:text-[25px] font-extrabold text-white leading-tight tracking-wide group-hover:translate-x-0.5 transition-transform">
              I’m a Hospital
            </span>
            <span className="text-sm sm:text-[17px] md:text-[18px] font-medium text-white/85 leading-snug mt-1.5">
              Hire the right specialist, faster.
            </span>
          </button>
        </div>

        {/* Bottom Helper Info Badge (Frame 593) */}
        <div className="w-full max-w-[448px] h-[48px] sm:h-[50px] bg-white/95 backdrop-blur-sm border border-black/20 rounded-[12px] shadow-sm flex items-center justify-center gap-2.5 px-4 sm:px-6">
          <svg
            className="w-5 h-5 text-[#406F52] flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="text-xs sm:text-base md:text-[17.5px] font-medium text-[#2D5F3F]/90 text-center truncate">
            You can create an account in the next step.
          </span>
        </div>

        {/* Divider 2: "Already have an account? Log in" (Frame 593) */}
        <div className="w-full max-w-[886px] flex items-center justify-center gap-3 sm:gap-6 my-1">
          <div className="flex-1 max-w-[140px] sm:max-w-[200px] h-[0px] border-t-2 border-black/25" />
          <div className="flex items-center gap-1.5 text-base sm:text-xl md:text-[23px] font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            <span className="text-white">Already have an account?</span>
            <Link
              href="/login"
              className="text-[#00E548] hover:text-[#52ff88] font-bold underline transition-colors cursor-pointer"
            >
              Log in
            </Link>
          </div>
          <div className="flex-1 max-w-[140px] sm:max-w-[200px] h-[0px] border-t-2 border-black/25" />
        </div>
      </main>
    </div>
  );
}
