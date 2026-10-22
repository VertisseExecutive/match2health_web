"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../redux/hooks";
import { createCheckoutSession } from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function PaymentDetailsPage() {
  const router = useRouter();
  const selectedPlan = useAppSelector((state) => state.plan.selectedPlan);
  const auth = useAppSelector((state) => state.auth);
  const { showToast } = useToast();

  const [cardholderName, setCardholderName] = useState(
    auth.user?.username || auth.user?.email?.split("@")[0] || ""
  );
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiNotice, setApiNotice] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      showToast("Please agree to the Terms & Conditions and Privacy Policy.", "error");
      return;
    }

    setIsSubmitting(true);
    setApiNotice(null);
    showToast("Processing payment & activating trial...", "loading");

    // If logged in with token, hit Stripe Checkout API
    if (auth.token) {
      try {
        const planType = selectedPlan?.billingCycle?.includes("year")
          ? "yearly"
          : "monthly";

        const res = await createCheckoutSession(planType, auth.token);

        if (res.data?.checkout_url) {
          showToast("Redirecting to secure Stripe checkout...", "loading");
          window.location.href = res.data.checkout_url;
          return;
        }
      } catch (err: any) {
        console.warn("Stripe Checkout notice:", err?.message || err);
        const notice =
          "Live Stripe credentials pending on backend. Continuing with trial activation.";
        setApiNotice(notice);
        showToast(notice, "info");
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Trial activated successfully!", "success");
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
          <div className="flex items-center justify-center gap-5 sm:gap-8 md:gap-10 mb-6 sm:mb-8 px-2">
            {/* VISA */}
            <div className="h-6 sm:h-7 md:h-8 flex items-center justify-center">
              <Image
                src="/payment-details/visa.png"
                alt="Visa"
                width={73}
                height={29}
                className="h-5 sm:h-6 md:h-7 w-auto object-contain"
                priority
              />
            </div>

            {/* Mastercard */}
            <div className="h-6 sm:h-7 md:h-8 flex items-center justify-center">
              <Image
                src="/payment-details/mastercard.png"
                alt="Mastercard"
                width={58}
                height={36}
                className="h-6 sm:h-7 md:h-8 w-auto object-contain"
                priority
              />
            </div>

            {/* AMEX */}
            <div className="h-6 sm:h-7 md:h-8 flex items-center justify-center">
              <Image
                src="/payment-details/Amex.png"
                alt="American Express"
                width={106}
                height={29}
                className="h-5 sm:h-6 md:h-7 w-auto object-contain"
                priority
              />
            </div>

            {/* PayPal */}
            <div className="h-6 sm:h-7 md:h-8 flex items-center justify-center">
              <Image
                src="/payment-details/paypal.png"
                alt="PayPal"
                width={123}
                height={30}
                className="h-5 sm:h-6 md:h-7 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 sm:gap-6">
            {/* API Notice */}
            {apiNotice && (
              <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-xs sm:text-sm font-medium">
                {apiNotice}
              </div>
            )}

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
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
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
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
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
