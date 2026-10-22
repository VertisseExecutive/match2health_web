import React from "react";
import Image from "next/image";
import { useToast } from "../../context/ToastContext";

interface SocialLoginButtonsProps {
  /** Optional callback when a provider is clicked */
  onSocialLogin?: (provider: "google" | "apple" | "facebook") => void;
}

/**
 * Social login buttons row (Google, Apple, Facebook)
 * Corresponds to Figma Frame 77
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
    <div className="w-full flex flex-col gap-4">
      {/* Divider with lines (Frame OR) */}
      <div className="w-full flex items-center justify-center gap-3 sm:gap-4 my-1">
        <div className="flex-1 h-[0px] border-t-[1.65px] border-black/20" />
        <span className="text-xs sm:text-base md:text-[19px] font-semibold text-black/60 whitespace-nowrap">
          or continue with
        </span>
        <div className="flex-1 h-[0px] border-t-[1.65px] border-black/20" />
      </div>

      {/* 3 Social Buttons Grid (Frame 77) */}
      <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleProviderClick("google")}
          className="h-[50px] sm:h-[60px] bg-white border border-[#215935]/60 hover:border-[#215935] rounded-[12px] shadow-sm flex items-center justify-center transition-all hover:scale-[1.02] cursor-pointer"
          title="Continue with Google"
        >
          <div className="relative w-7 h-7 sm:w-[36px] sm:h-[36px]">
            <Image
              src="/loigin/google.png"
              alt="Google"
              fill
              className="object-contain"
            />
          </div>
        </button>

        {/* Apple */}
        <button
          type="button"
          onClick={() => handleProviderClick("apple")}
          className="h-[50px] sm:h-[60px] bg-white border border-[#215935]/60 hover:border-[#215935] rounded-[12px] shadow-sm flex items-center justify-center transition-all hover:scale-[1.02] cursor-pointer"
          title="Continue with Apple"
        >
          <div className="relative w-7 h-7 sm:w-[36px] sm:h-[36px]">
            <Image
              src="/loigin/apple.png"
              alt="Apple"
              fill
              className="object-contain"
            />
          </div>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => handleProviderClick("facebook")}
          className="h-[50px] sm:h-[60px] bg-white border border-[#215935]/60 hover:border-[#215935] rounded-[12px] shadow-sm flex items-center justify-center transition-all hover:scale-[1.02] cursor-pointer"
          title="Continue with Facebook"
        >
          <div className="relative w-7 h-7 sm:w-[36px] sm:h-[36px]">
            <Image
              src="/loigin/facebook logo.png"
              alt="Facebook"
              fill
              className="object-contain"
            />
          </div>
        </button>
      </div>
    </div>
  );
};
