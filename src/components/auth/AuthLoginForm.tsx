import React, { useState } from "react";
import Link from "next/link";
import { SocialLoginButtons } from "./SocialLoginButtons";

interface AuthLoginFormProps {
  /** Form submission handler */
  onSubmit: (emailOrPhone: string, password: string, rememberMe: boolean) => Promise<void>;
  /** Loading state during server verification */
  isLoading: boolean;
  /** Server or validation error message */
  errorMessage: string | null;
  /** Signup destination URL (defaults to /plans) */
  signUpHref?: string;
  /** Forgot password destination URL */
  forgotPasswordHref?: string;
}

/**
 * Login Form component containing input fields, remember me, submit button, and social logins.
 * Corresponds to Figma Frame 527, Frame 543, Frame 544, Frame 451, Frame 531.
 */
export const AuthLoginForm: React.FC<AuthLoginFormProps> = ({
  onSubmit,
  isLoading,
  errorMessage,
  signUpHref = "/plans",
  forgotPasswordHref = "/forgot-password",
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(emailOrPhone, password, rememberMe);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[578px] flex flex-col gap-5 sm:gap-6">
      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base font-medium flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Email or Phone Field (Figma Frame 543) */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="emailOrPhone"
          className="text-base sm:text-[21px] font-medium text-black tracking-normal"
        >
          Email or Phone number
        </label>
        <div
          className="w-full h-[58px] sm:h-[70px] bg-white rounded-[7.6px] flex items-center px-4 sm:px-6 gap-3 sm:gap-4 interactive-input"
          style={{
            border: "1.9px solid rgba(45, 95, 63, 0.6)",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Envelope Icon */}
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-black/65 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <input
            id="emailOrPhone"
            type="text"
            required
            placeholder="Enter email or phone number"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full h-full text-base sm:text-[19px] font-medium text-black placeholder:text-[#919191] bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Password Field (Figma Frame 544) */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="password"
          className="text-base sm:text-[21px] font-medium text-black tracking-normal"
        >
          Password
        </label>
        <div
          className="w-full h-[58px] sm:h-[71px] bg-white rounded-[7.6px] flex items-center px-4 sm:px-6 gap-3 sm:gap-4 interactive-input"
          style={{
            border: "1.9px solid rgba(45, 95, 63, 0.6)",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Lock Icon */}
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-black/50 flex-shrink-0"
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
            id="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full text-base sm:text-[19px] font-medium text-black placeholder:text-[#919191] bg-transparent focus:outline-none"
          />
          {/* Eye Toggle Icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-black/65 hover:text-black p-1 flex-shrink-0 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password Row (Figma Frame 525) */}
      <div className="flex items-center justify-between w-full pt-1">
        {/* Remember me (Frame 523) */}
        <label className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-[3.3px] border-[1.65px] border-black text-[#215935] focus:ring-[#215935] cursor-pointer"
          />
          <span className="text-sm sm:text-base md:text-[19px] font-medium text-black">
            Remember me
          </span>
        </label>

        {/* Forgot Password Link (Frame 524) */}
        <Link
          href={forgotPasswordHref}
          className="text-sm sm:text-base md:text-[19px] font-semibold text-[#215935] hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button (Figma Frame 451) */}
      <div className="w-full flex justify-center pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full max-w-[444px] h-[52px] sm:h-[55.5px] bg-[#215935] hover:bg-[#1a472a] disabled:opacity-85 text-white font-bold text-base sm:text-[18px] tracking-[0.02em] rounded-[56.5px] shadow-[0px_5px_4px_rgba(0,0,0,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 btn-spring"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="opacity-95"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
      </div>

      {/* Social Logins */}
      <SocialLoginButtons />

      {/* Don't have an account? Sign Up (Figma Frame 531) */}
      <div className="w-full text-center pt-2">
        <span className="text-base sm:text-xl md:text-[22px] font-medium text-black">
          Don’t have an account?{" "}
          <Link href={signUpHref} className="font-bold text-[#215935] hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </form>
  );
};
