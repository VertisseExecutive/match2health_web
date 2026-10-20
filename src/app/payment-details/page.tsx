"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../redux/hooks";

export default function PaymentDetailsPage() {
  const router = useRouter();
  const selectedPlan = useAppSelector((state) => state.plan.selectedPlan);
  const auth = useAppSelector((state) => state.auth);

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  // Format Expiry Date MM / YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)} / ${raw.slice(2, 4)}`;
    }
    setExpiryDate(raw);
  };

  // Format CVV (3-4 digits)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvv(raw);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/congratulations");
    }, 600);
  };


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
                alt="Medicare Hospital"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-base sm:text-xl md:text-[22px] tracking-[0.03em] sm:tracking-[0.05em] text-[#171717] truncate">
              Medicare Hospital
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
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-10 md:py-12">
        <div className="w-full max-w-[735px] flex flex-col items-center">
          {/* Header Row with Back Button */}
          <div className="w-full relative flex items-center justify-center mb-5 sm:mb-6">
            <button
              type="button"
              onClick={() => router.push("/verify-account")}
              className="absolute left-0 p-1.5 sm:p-2 text-[#215935] hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1"
              title="Back to Verify Account"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>

            {/* Title & Subtitle */}
            <div className="text-center px-8 sm:px-12">
              <h1 className="text-2xl sm:text-[30px] md:text-[32.6px] font-bold text-black leading-tight tracking-[0.02em]">
                Payment Details
              </h1>
              <p className="text-sm sm:text-lg md:text-[22px] font-medium text-black/70 tracking-[0.01em] mt-1.5 sm:mt-2">
                Enter your card details to start free trial
              </p>
            </div>
          </div>

          {/* Card Logos Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12 mb-6 sm:mb-8 px-2">
            {/* VISA */}
            <div className="h-5 sm:h-6 flex items-center">
              <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 78 24" fill="none">
                <path
                  d="M32.5 1.5L20.8 22.5H13.6L7.4 5.8C7.1 4.5 6.2 3.4 5 2.8C3.1 1.8 0 1.2 0 1.2L0.2 0H11.4C12.9 0 14.2 1 14.5 2.6L17.2 16.5L25.3 1.5H32.5Z"
                  fill="#1A1F71"
                />
                <path
                  d="M45.5 15.8C45.5 9.8 37.3 9.4 37.4 6.7C37.4 5.9 38.2 5 40 4.8C40.9 4.7 43.4 4.6 46.2 5.9L47.3 0.9C45.8 0.4 43.8 0 41.3 0C36.3 0 32.8 2.6 32.7 6.4C32.6 9.2 35.1 10.8 37 11.7C38.9 12.6 39.5 13.2 39.5 14C39.5 15.3 37.9 15.9 36.4 15.9C33.8 15.9 32.3 15.2 31.1 14.6L30 19.8C31.5 20.5 34.3 21.1 37.1 21.1C42.4 21.1 45.5 18.6 45.5 15.8Z"
                  fill="#1A1F71"
                />
                <path
                  d="M58.9 22.5H65.2L59.7 1.5H53.9C52.7 1.5 51.7 2.2 51.3 3.3L43.8 22.5H50.4L51.7 18.8H59.8L58.9 22.5ZM53.5 13.9L56.8 4.7L58.7 13.9H53.5Z"
                  fill="#1A1F71"
                />
                <path d="M78 1.5L72.8 22.5H66.6L71.8 1.5H78Z" fill="#1A1F71" />
              </svg>
            </div>

            {/* RuPay */}
            <div className="h-5 sm:h-6 flex items-center">
              <span className="font-extrabold text-lg sm:text-[22px] tracking-tight text-[#0972B7] flex items-center">
                RuPay
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 inline-block" viewBox="0 0 20 20" fill="none">
                  <path d="M2 3L11 10L2 17V3Z" fill="#0972B7" />
                  <path d="M10 3L19 10L10 17V3Z" fill="#F47721" />
                </svg>
              </span>
            </div>

            {/* Mastercard */}
            <div className="h-6 sm:h-8 flex items-center">
              <svg className="h-6 sm:h-8 w-auto" viewBox="0 0 48 30" fill="none">
                <circle cx="16" cy="15" r="14" fill="#EB001B" />
                <circle cx="32" cy="15" r="14" fill="#F79E1B" fillOpacity="0.88" />
              </svg>
            </div>

            {/* AMEX */}
            <div className="h-5 sm:h-6 flex items-center">
              <div className="bg-[#006FCF] text-white font-black text-[11px] sm:text-[13px] tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xs shadow-xs flex items-center">
                AMEX
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 sm:gap-6">
            {/* Cardholder Name */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="cardholderName"
                className="text-base sm:text-[19.9px] font-medium text-black"
              >
                Cardholder Name
              </label>
              <div
                className="w-full h-[54px] sm:h-[60px] bg-white rounded-[7px] flex items-center px-4 sm:px-5 gap-3 sm:gap-4 transition-all focus-within:ring-2 focus-within:ring-[#215935]"
                style={{
                  border: "1.72px solid rgba(45, 95, 63, 0.25)",
                  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* ID Card Icon */}
                <svg
                  className="w-5 h-5 text-[#545454] flex-shrink-0"
                  viewBox="0 0 24 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="16" rx="2" />
                  <line x1="6" y1="6" x2="10" y2="6" />
                  <line x1="6" y1="10" x2="10" y2="10" />
                  <circle cx="16" cy="9" r="2.5" />
                </svg>
                <input
                  id="cardholderName"
                  type="text"
                  required
                  placeholder="Enter name on card"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full h-full text-sm sm:text-[17.5px] font-medium text-black placeholder:text-black/60 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Card Number */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="cardNumber"
                className="text-base sm:text-[19.9px] font-medium text-black"
              >
                Card Number
              </label>
              <div
                className="w-full h-[54px] sm:h-[60px] bg-white rounded-[7px] flex items-center px-4 sm:px-5 gap-3 sm:gap-4 transition-all focus-within:ring-2 focus-within:ring-[#215935]"
                style={{
                  border: "1.72px solid rgba(45, 95, 63, 0.25)",
                  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* Credit Card Icon */}
                <svg
                  className="w-5 h-5 text-gray-500 flex-shrink-0"
                  viewBox="0 0 24 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="1" width="20" height="16" rx="2" />
                  <line x1="2" y1="6" x2="22" y2="6" />
                  <line x1="5" y1="12" x2="9" y2="12" />
                </svg>
                <input
                  id="cardNumber"
                  type="text"
                  required
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full h-full text-sm sm:text-[17.5px] font-medium text-black placeholder:text-black/60 bg-transparent focus:outline-none tracking-wider"
                />
                {/* Eye / Security Icon */}
                <div className="text-black/60 p-1 flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Expiry Date & CVV Row (Side-by-side on all screens) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full">
              {/* Expiry Date */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="expiryDate"
                  className="text-base sm:text-[19.9px] font-medium text-black truncate"
                >
                  Expiry Date
                </label>
                <div
                  className="w-full h-[52px] sm:h-[58px] bg-white rounded-[7px] flex items-center px-4 sm:px-5 transition-all focus-within:ring-2 focus-within:ring-[#215935]"
                  style={{
                    border: "1.72px solid rgba(45, 95, 63, 0.25)",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <input
                    id="expiryDate"
                    type="text"
                    required
                    maxLength={7}
                    placeholder="MM / YY"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    className="w-full h-full text-sm sm:text-[17.5px] font-medium text-black placeholder:text-black/60 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* CVV */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="cvv"
                  className="text-base sm:text-[19.9px] font-medium text-black"
                >
                  CVV
                </label>
                <div
                  className="w-full h-[52px] sm:h-[58px] bg-white rounded-[7px] flex items-center px-4 sm:px-5 transition-all focus-within:ring-2 focus-within:ring-[#215935]"
                  style={{
                    border: "1.72px solid rgba(45, 95, 63, 0.25)",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <input
                    id="cvv"
                    type="password"
                    required
                    maxLength={4}
                    placeholder="123"
                    value={cvv}
                    onChange={handleCvvChange}
                    className="w-full h-full text-sm sm:text-[17.5px] font-medium text-black placeholder:text-black/60 bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="flex flex-col gap-2.5 sm:gap-3 py-1">
              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5 sm:mt-0">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                    <path
                      d="M4 10L8 14L16 5"
                      stroke="#009937"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-[16.5px] font-medium tracking-[0.03em] sm:tracking-[0.05em] text-black/80">
                  No charges today.
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5 sm:mt-0">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                    <path
                      d="M4 10L8 14L16 5"
                      stroke="#009937"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-[16.5px] font-medium tracking-[0.03em] sm:tracking-[0.05em] text-black/80">
                  Access all Premium features
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5 sm:mt-0">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                    <path
                      d="M4 10L8 14L16 5"
                      stroke="#009937"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-[16.5px] font-medium tracking-[0.03em] sm:tracking-[0.05em] text-black/80">
                  Billing starts automatically after your 30-day trial ends.
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5 sm:mt-0">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                    <path
                      d="M4 10L8 14L16 5"
                      stroke="#009937"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-[16.5px] font-medium tracking-[0.03em] sm:tracking-[0.05em] text-black/80">
                  You can cancel anytime before renewal.
                </span>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2.5 sm:gap-3 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 rounded-[3px] border border-black text-[#215935] focus:ring-[#215935] cursor-pointer flex-shrink-0"
              />
              <label
                htmlFor="terms"
                className="text-xs sm:text-base md:text-[17.5px] font-medium text-black cursor-pointer select-none leading-relaxed"
              >
                I agree to{" "}
                <Link
                  href="/terms"
                  className="text-[#215935] underline hover:text-[#184227]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#215935] underline hover:text-[#184227]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Activate Free Trial Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[54px] sm:h-[60px] bg-[#215935] hover:bg-[#1a472a] active:scale-[0.99] text-white font-bold text-lg sm:text-[21px] tracking-[0.05em] rounded-[9.6px] shadow-[0px_4px_5px_rgba(0,0,0,0.3)] transition-all cursor-pointer flex items-center justify-center mt-2"
            >
              {isSubmitting ? "Activating Trial..." : "Activate Free Trial"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
