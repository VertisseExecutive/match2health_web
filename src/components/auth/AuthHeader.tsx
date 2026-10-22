import React from "react";
import { useRouter } from "next/navigation";
import { AuthMobileLogo } from "./AuthMobileLogo";

interface AuthHeaderProps {
  /** Optional custom title */
  title?: string;
  /** Optional custom subtitle */
  subtitle?: string;
  /** Optional custom back navigation handler */
  onBack?: () => void;
  /** Optional href to navigate back to */
  backHref?: string;
  /** Whether to show back button (defaults to true) */
  showBack?: boolean;
}

/**
 * AuthHeader Component
 * Contains the Back button, mobile logo for small screens, and the screen title/subtitle
 */
export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title = "Welcome Back!",
  subtitle = "Please login to your account",
  onBack,
  backHref,
  showBack = true,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Back Button (Figma Frame 599) */}
      {showBack && (
        <button
          type="button"
          onClick={handleBack}
          className="self-start sm:absolute sm:top-0 sm:left-0 lg:top-2 lg:left-0 p-2 rounded-full text-black/70 hover:text-black hover:bg-black/5 transition-colors cursor-pointer mb-3 sm:mb-0"
          aria-label="Go back"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Mobile Header Logo (Visible on mobile/tablet when left hero banner is hidden) */}
      <AuthMobileLogo />

      {/* Header Headings (Figma Frame 518) */}
      <div className="text-center w-full mb-4 sm:mb-5 lg:mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] font-bold text-black tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base lg:text-[18px] xl:text-[20px] font-medium text-black/70 mt-1 leading-snug">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
