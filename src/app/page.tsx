"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedPlan } from "../redux/slices/planSlice";

interface Plan {
  id: string;
  range: string;
  employeesLabel: string;
  price: string;
  billingCycle: string;
  trialText: string;
  buttonText: string;
  iconSrc: string;
  theme: {
    cardBg: string;
    borderColor: string;
    dividerColor: string;
    iconColor: string;
    rangeColor: string;
    trialColor: string;
    buttonBg: string;
    buttonHoverBg: string;
  };
  isMostPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: "plan-1",
    range: "1–49",
    employeesLabel: "Employees",
    price: "$49",
    billingCycle: "/month",
    trialText: "14-Day Free Trial",
    buttonText: "Choose Plan",
    iconSrc: "/payment-verify-UserLogo/user-green.png",
    theme: {
      cardBg: "#F6FFF9",
      borderColor: "rgba(45, 95, 63, 0.55)",
      dividerColor: "rgba(45, 95, 63, 0.22)",
      iconColor: "#006625",
      rangeColor: "#00AB3D",
      trialColor: "#006625",
      buttonBg: "#006625",
      buttonHoverBg: "#004d1c",
    },
  },
  {
    id: "plan-2",
    range: "50–299",
    employeesLabel: "Employees",
    price: "$99",
    billingCycle: "/month",
    trialText: "14-Day Free Trial",
    buttonText: "Choose Plan",
    iconSrc: "/payment-verify-UserLogo/user-blue.png",
    theme: {
      cardBg: "#F0F9FF",
      borderColor: "rgba(0, 53, 212, 0.55)",
      dividerColor: "rgba(0, 53, 212, 0.22)",
      iconColor: "#0035D4",
      rangeColor: "#2E62FF",
      trialColor: "#0035D4",
      buttonBg: "#0035D4",
      buttonHoverBg: "#0028a3",
    },
  },
  {
    id: "plan-3",
    range: "300–999",
    employeesLabel: "Employees",
    price: "$199",
    billingCycle: "/month",
    trialText: "14-Day Free Trial",
    buttonText: "Choose Plan",
    iconSrc: "/payment-verify-UserLogo/user-bagan.png",
    theme: {
      cardBg: "#F9F5FF",
      borderColor: "rgba(138, 56, 245, 0.55)",
      dividerColor: "rgba(111, 0, 255, 0.22)",
      iconColor: "#5A00D0",
      rangeColor: "#8121FF",
      trialColor: "#5A00D0",
      buttonBg: "#5A00D0",
      buttonHoverBg: "#430099",
    },
  },
  {
    id: "plan-4",
    range: "999+",
    employeesLabel: "Employees",
    price: "$299",
    billingCycle: "/month",
    trialText: "14-Day Free Trial",
    buttonText: "Choose Plan",
    isMostPopular: true,
    iconSrc: "/payment-verify-UserLogo/user-yellow.png",
    theme: {
      cardBg: "#FFF8EE",
      borderColor: "rgba(255, 150, 0, 0.55)",
      dividerColor: "rgba(178, 105, 0, 0.22)",
      iconColor: "#C97600",
      rangeColor: "#E68700",
      trialColor: "#C97600",
      buttonBg: "#C97600",
      buttonHoverBg: "#9e5c00",
    },
  },
];

export default function PricingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reduxSelectedPlan = useAppSelector((state) => state.plan.selectedPlan);
  const [selectedPlan, setLocalSelectedPlan] = useState<Plan | null>(null);

  const handleSelectPlan = (plan: Plan) => {
    setLocalSelectedPlan(plan);
    dispatch(
      setSelectedPlan({
        id: plan.id,
        range: plan.range,
        employeesLabel: plan.employeesLabel,
        price: plan.price,
        billingCycle: plan.billingCycle,
        trialText: plan.trialText,
        buttonText: plan.buttonText,
        isMostPopular: plan.isMostPopular,
      })
    );
    router.push(`/verify-account?plan=${plan.id}`);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 h-[68px] sm:h-[72px] flex items-center justify-between gap-2">
          {/* Logo & Company Name */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0">
              <Image
                src="/LogoSignet.png"
                alt="Medicare Hospitals"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-base sm:text-xl tracking-tight text-black truncate">
              Medicare Hospitals
            </span>
          </div>

          {/* Secure Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700 text-xs sm:text-sm md:text-base font-medium flex-shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="hidden sm:inline">Secure &amp; Encrypted Payment</span>
            <span className="sm:hidden">Secure</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1340px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 flex flex-col items-center gap-8 sm:gap-10">
        {/* Title & Subtitle */}
        <div className="text-center max-w-3xl flex flex-col gap-2 sm:gap-2.5 px-2">
          <h1 className="text-2xl sm:text-[30px] md:text-[33px] font-bold tracking-[0.02em] leading-tight text-black">
            Choose the Right Plan for Your Organization
          </h1>
          <p className="text-sm sm:text-lg md:text-[22px] font-medium text-black/70 leading-normal">
            All plans include the same features. Choose the plan based on your organization size.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 items-stretch pt-6 sm:pt-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col justify-between rounded-[11px] transition-transform duration-200 hover:-translate-y-1 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] p-6 sm:p-7 md:p-8"
              style={{
                backgroundColor: plan.theme.cardBg,
                border: `1px solid ${plan.theme.borderColor}`,
                minHeight: "410px",
              }}
            >
              {/* Most Popular Badge */}
              {plan.isMostPopular && (
                <div className="absolute -top-[20px] sm:-top-[23px] left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center justify-center bg-[#FF9600] border border-[#B39200] text-white font-bold text-xs sm:text-[15px] md:text-[17px] tracking-wide px-4 sm:px-5 py-1 sm:py-1.5 rounded-[13px] shadow-sm whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Top: Icon & Employee Count */}
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                {/* 3 People Icon */}
                <div className="flex items-center justify-center py-1 sm:py-2 h-[48px] sm:h-[52px]">
                  <Image
                    src={plan.iconSrc}
                    alt={plan.employeesLabel}
                    width={75}
                    height={50}
                    className="h-[42px] sm:h-[48px] w-auto object-contain"
                    priority
                  />
                </div>

                {/* Range & Label */}
                <div
                  className="w-full flex flex-col items-center pb-4 sm:pb-5"
                  style={{
                    borderBottom: `1px solid ${plan.theme.dividerColor}`,
                  }}
                >
                  <span
                    className="text-xl sm:text-[25px] font-semibold tracking-[0.04em]"
                    style={{ color: plan.theme.rangeColor }}
                  >
                    {plan.range}
                  </span>
                  <span className="text-lg sm:text-[22px] font-semibold text-black">
                    {plan.employeesLabel}
                  </span>
                </div>
              </div>

              {/* Card Middle: Price & Free Trial */}
              <div className="flex flex-col items-center gap-2 sm:gap-3 my-4">
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl sm:text-[35px] font-bold tracking-[0.05em] text-black">
                    {plan.price}
                  </span>
                  <span className="text-lg sm:text-[22px] font-medium text-black/90 ml-1">
                    {plan.billingCycle}
                  </span>
                </div>

                <div
                  className="text-lg sm:text-[21px] font-medium tracking-tight text-center"
                  style={{ color: plan.theme.trialColor }}
                >
                  {plan.trialText}
                </div>
              </div>

              {/* Choose Plan Button */}
              <button
                type="button"
                onClick={() => handleSelectPlan(plan)}
                className="w-full h-[52px] sm:h-[60px] rounded-[11px] text-white text-lg sm:text-[21px] font-semibold tracking-[0.04em] flex items-center justify-center transition-all duration-150 cursor-pointer shadow-sm active:scale-[0.98]"
                style={{
                  backgroundColor: plan.theme.buttonBg,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = plan.theme.buttonHoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = plan.theme.buttonBg;
                }}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* All Plans Include Section */}
        <section className="w-full bg-white rounded-[15px] border border-black/30 shadow-[0px_3px_7px_rgba(0,0,0,0.25)] p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          {/* Left Illustration */}
          <div className="flex-shrink-0 w-full max-w-[260px] sm:max-w-[328px] h-auto flex items-center justify-center relative">
            <Image
              src="/payment-verify-UserLogo/all-plan-include-logo.png"
              alt="All Plans Include Protection"
              width={328}
              height={220}
              className="w-full h-auto object-contain max-h-[220px]"
              priority
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-black/20" />
          <div className="md:hidden w-full h-px bg-black/15 my-2" />

          {/* Right Features Grid */}
          <div className="flex-1 w-full flex flex-col justify-center">
            <h2 className="text-xl sm:text-[24px] font-semibold text-black tracking-[0.05em] mb-4 sm:mb-6 text-center md:text-left">
              All Plans Include
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8">
              {/* Feature 1 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#009937" strokeWidth="2" />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="#009937"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-base md:text-[18px] font-medium tracking-[0.03em] sm:tracking-[0.04em] text-black">
                  Up to 50 Team Member Accounts
                </span>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#009937" strokeWidth="2" />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="#009937"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-base md:text-[18px] font-medium tracking-[0.03em] sm:tracking-[0.04em] text-black">
                  Resume Download
                </span>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#009937" strokeWidth="2" />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="#009937"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-base md:text-[18px] font-medium tracking-[0.03em] sm:tracking-[0.04em] text-black">
                  Unlimited Job Posts
                </span>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#009937" strokeWidth="2" />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="#009937"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-base md:text-[18px] font-medium tracking-[0.03em] sm:tracking-[0.04em] text-black">
                  Candidate Ranking
                </span>
              </div>

              {/* Feature 5 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#009937" strokeWidth="2" />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="#009937"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-base md:text-[18px] font-medium tracking-[0.03em] sm:tracking-[0.04em] text-black">
                  AI Candidate Search
                </span>
              </div>

              {/* Feature 6 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#009937" strokeWidth="2" />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="#009937"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-base md:text-[18px] font-medium tracking-[0.03em] sm:tracking-[0.04em] text-black">
                  Direct Messaging
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 14-Day Free Trial Bottom Box */}
        <section className="w-full bg-[#F0FFF6] border-2 border-dashed border-[#2D5F3F] rounded-[15px] p-5 sm:p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          {/* Left Side: Calendar & Trial Details */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6 md:gap-8 flex-1">
            {/* Calendar Icon */}
            <div className="w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] flex items-center justify-center flex-shrink-0 relative">
              <Image
                src="/payment-verify-UserLogo/14-days-trail-log.png"
                alt="14-Day Free Trial"
                width={75}
                height={75}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Trial Copy & Bullets */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
              <h3 className="text-lg sm:text-[22px] font-bold text-black tracking-[0.02em]">
                14-Day Free Trial
              </h3>
              <ul className="flex flex-col gap-1.5 sm:gap-2">
                <li className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                  <span className="w-2.5 h-2.5 sm:w-[11.5px] sm:h-[11.5px] mt-1 sm:mt-0 rounded-full bg-[#00960A] shadow-[0px_0px_6px_rgba(0,184,12,0.31)] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-[17px] font-medium text-black/80">
                    Full access to all features during the 14-day trial.
                  </span>
                </li>
                <li className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                  <span className="w-2.5 h-2.5 sm:w-[11.5px] sm:h-[11.5px] mt-1 sm:mt-0 rounded-full bg-[#00960A] shadow-[0px_0px_6px_rgba(0,184,12,0.31)] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-[17px] font-medium text-black/80">
                    Payment will be activated automatically on Day 15.
                  </span>
                </li>
                <li className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                  <span className="w-2.5 h-2.5 sm:w-[11.5px] sm:h-[11.5px] mt-1 sm:mt-0 rounded-full bg-[#00960A] shadow-[0px_0px_6px_rgba(0,184,12,0.31)] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-[17px] font-medium text-black/80">
                    Cancel your plan anytime before the trial ends.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-[#008731]/40" />
          <div className="md:hidden w-full h-px bg-[#008731]/25 my-1" />

          {/* Right Side: Shield & No Charges */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6 md:gap-8 max-w-md flex-shrink-0">
            {/* Outline Shield Icon */}
            <div className="w-10 h-12 sm:w-[56px] sm:h-[65px] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 56 65" className="w-full h-full" fill="none">
                <path
                  d="M28 4L5 14V34C5 48 15 58 28 62C41 58 51 48 51 34V14L28 4Z"
                  stroke="#2D5F3F"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 32L26 38L37 26"
                  stroke="#2D5F3F"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <h4 className="text-base sm:text-lg md:text-[22px] font-bold text-[#006C27] tracking-[0.5px]">
                No Charges During Your Trial
              </h4>
              <p className="text-xs sm:text-sm md:text-[17px] font-medium text-black/80 leading-snug">
                You Can Cancel Anytime Before Your Trial Ends.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
