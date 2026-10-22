import React from "react";
import { useToast } from "../../context/ToastContext";

interface SocialLoginButtonsProps {
  /** Optional callback when a provider is clicked */
  onSocialLogin?: (provider: "google" | "apple" | "facebook") => void;
}

/**
 * Social login buttons row (Google, Apple, Facebook)
 * Clean, high-resolution official SVG icons perfectly sized & centered (Figma Frame 77)
 */
export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onSocialLogin,
}) => {
  const { showToast } = useToast();

  const handleProviderClick = (provider: "google" | "apple" | "facebook") => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    } else {
      const name = provider.charAt(0).toUpperCase() + provider.slice(1);
      showToast(`${name} login coming soon`, "info");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3.5 sm:gap-4">
      {/* Divider with lines (Frame OR) */}
      <div className="w-full flex items-center justify-center gap-3 sm:gap-4 my-1">
        <div className="flex-1 h-[0px] border-t border-black/20" />
        <span className="text-xs sm:text-sm md:text-[15px] font-semibold text-black/60 whitespace-nowrap">
          or continue with
        </span>
        <div className="flex-1 h-[0px] border-t border-black/20" />
      </div>

      {/* 3 Social Buttons Grid (Frame 77) */}
      <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleProviderClick("google")}
          className="h-12 sm:h-13 md:h-[54px] lg:h-[58px] bg-white border border-[#215935]/40 hover:border-[#215935] hover:bg-emerald-50/25 rounded-[10px] shadow-xs flex items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          title="Continue with Google"
        >
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-[35px] md:h-[35px]"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </button>

        {/* Apple */}
        <button
          type="button"
          onClick={() => handleProviderClick("apple")}
          className="h-12 sm:h-13 md:h-[54px] lg:h-[58px] bg-white border border-[#215935]/40 hover:border-[#215935] hover:bg-emerald-50/25 rounded-[10px] shadow-xs flex items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          title="Continue with Apple"
        >
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-[35px] md:h-[35px] text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.06 1.73-.93 2.76 1.01.08 2.03-.53 2.62-1.26z" />
          </svg>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => handleProviderClick("facebook")}
          className="h-12 sm:h-13 md:h-[54px] lg:h-[58px] bg-white border border-[#215935]/40 hover:border-[#215935] hover:bg-emerald-50/25 rounded-[10px] shadow-xs flex items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          title="Continue with Facebook"
        >
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-[35px] md:h-[35px]"
            viewBox="0 0 24 24"
          >
            <path
              fill="#1877F2"
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
