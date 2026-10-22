import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Mobile/Tablet header logo displayed on small screens when the hero banner is hidden
 */
export const AuthMobileLogo: React.FC = () => {
  return (
    <div className="lg:hidden flex items-center justify-center gap-3 mb-6 sm:mb-8">
      <Link href="/" className="flex items-center gap-3" title="Return to Home">
        <div className="relative w-[50px] h-[50px] flex-shrink-0">
          <Image
            src="/LogoSignet.png"
            alt="Match2Health Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col">
          <div className="text-[#004218] font-bold text-[24px] leading-tight tracking-tight flex items-center">
            <span>match</span>
            <span className="text-[#C97600]">2</span>
            <span>health</span>
          </div>
          <div className="w-full h-[1.5px] bg-[#00AB3D] my-0.5" />
          <span className="text-[#00461A] text-[9.5px] font-semibold tracking-[0.2em] uppercase">
            healthcare recruitment
          </span>
        </div>
      </Link>
    </div>
  );
};
