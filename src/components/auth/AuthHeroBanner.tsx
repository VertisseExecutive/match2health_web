import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthHeroBannerProps {
  /** Optional custom tagline text */
  tagline?: string;
  /** Custom hero image source */
  imageSrc?: string;
  /** Whether to show the top logo overlay (true by default for login, false if pre-rendered in image) */
  showLogo?: boolean;
}

/**
 * Left-side hero banner for Auth screens (Desktop only: hidden lg:block)
 * Corresponds to Figma Frame 220 (554px width)
 */
export const AuthHeroBanner: React.FC<AuthHeroBannerProps> = ({
  tagline = "Find the right talent. Build a healthier future.",
  imageSrc = "/loigin/login screen left side photo.png",
  showLogo = true,
}) => {
  return (
    <aside
      className="hidden lg:block relative w-[340px] xl:w-[440px] 2xl:w-[554px] min-h-screen flex-shrink-0 overflow-hidden transition-all duration-300"
      style={{
        background: "linear-gradient(180.05deg, #033320 2.88%, #043421 100.95%)",
        boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Background Hero Illustration */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt={tagline}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Top Logo Container (Figma Frame 577: 345px x 91px) */}
      {showLogo && (
        <div
          className="absolute z-20 transition-all duration-200"
          style={{
            width: "345px",
            height: "91px",
            left: "32px",
            top: "40px",
          }}
        >
          <Link
            href="/"
            className="w-full h-full flex items-center gap-3.5 hover:opacity-95 transition-opacity group"
            title="Return to Match2Health Home"
          >
            {/* LogoSignet Circle Icon */}
            <div className="relative w-[72px] h-[72px] flex-shrink-0 drop-shadow-md">
              <Image
                src="/app-logo.png"
                alt="Match2Health Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* High-Contrast White Brand Text on Dark Green Background */}
            <div className="flex flex-col justify-center">
              <div className="text-white font-extrabold text-[27px] leading-tight tracking-tight flex items-center">
                <span>match</span>
                <span className="text-[#FFC107]">2</span>
                <span>health</span>
              </div>
              {/* Green divider line */}
              <div className="w-[185px] h-[2px] bg-[#00E548] my-1" />
              {/* Slogan */}
              <span className="text-white/95 text-[11px] font-medium tracking-[0.22em] uppercase">
                healthcare recruitment
              </span>
            </div>
          </Link>
        </div>
      )}
    </aside>
  );
};
