"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import { logoutUser } from "../../services/auth";
import { useToast } from "../../context/ToastContext";

type NavItemKey =
  | "dashboard"
  | "onboarding"
  | "job-posting"
  | "company-profile"
  | "chat"
  | "candidate-search"
  | "pipeline"
  | "notification"
  | "settings";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const authState = useAppSelector((state) => state.auth);

  const roleParam = searchParams.get("role")?.toLowerCase() || "";
  const userRole = (authState.user?.role?.toLowerCase() || "");
  const activeRole = roleParam || userRole || "hospital";

  const isCompany =
    activeRole === "hospital" ||
    activeRole === "company" ||
    activeRole === "team_member";

  const [activeNav, setActiveNav] = useState<NavItemKey>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [candidateQuery, setCandidateQuery] = useState("");

  const handleLogout = async () => {
    showToast("Signing out...", "loading");
    try {
      await logoutUser(authState.token || undefined);
    } catch {
      // client logout proceeds
    }
    dispatch(logout());
    showToast("Signed out successfully", "success");
    router.push("/login");
  };

  const displayName =
    authState.user?.username ||
    (isCompany ? "Medicare Hospitals" : "Dr. Jessica Reynolds");

  const displayPlan = "Free Plan";

  return (
    <div className="min-h-screen bg-[#F8F8F6] text-black font-sans flex flex-col antialiased">
      <div className="flex-1 flex w-full relative">
        {/* ─────────────────────────────────────────────────────────────
            1. LEFT NAVIGATION SIDEBAR (width: 292px)
        ───────────────────────────────────────────────────────────── */}
        <aside className="w-[260px] xl:w-[292px] min-h-screen bg-white border-r border-[#E5E7EB] flex flex-col justify-between py-6 px-4 sm:px-6 fixed left-0 top-0 bottom-0 z-30 overflow-y-auto">
          {/* Top Brand Logo */}
          <div>
            <div className="flex items-center justify-center pt-2 pb-8">
              <Link href="/" className="relative w-16 h-16 xl:w-[72px] xl:h-[72px] hover:scale-105 transition-transform">
                <Image
                  src="/LogoSignet.png"
                  alt="Match2Health Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-1.5">
              {/* Dashboard */}
              <button
                type="button"
                onClick={() => setActiveNav("dashboard")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeNav === "dashboard"
                    ? "bg-[#DDE9E2] text-[#215935]"
                    : "text-[#525252] hover:bg-black/5 hover:text-black"
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                </svg>
                <span>Dashboard</span>
              </button>

              {/* Onboarding */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav("onboarding");
                  showToast("Opening Onboarding...", "info");
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeNav === "onboarding"
                    ? "bg-[#DDE9E2] text-[#215935]"
                    : "text-[#525252] hover:bg-black/5 hover:text-black"
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Onboarding</span>
              </button>

              {/* Job Posting */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav("job-posting");
                  showToast("Opening Job Postings...", "info");
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeNav === "job-posting"
                    ? "bg-[#DDE9E2] text-[#215935]"
                    : "text-[#525252] hover:bg-black/5 hover:text-black"
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Job Posting</span>
              </button>

              {/* Company Profile */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav("company-profile");
                  showToast("Opening Company Profile...", "info");
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeNav === "company-profile"
                    ? "bg-[#DDE9E2] text-[#215935]"
                    : "text-[#525252] hover:bg-black/5 hover:text-black"
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <span>Company Profile</span>
              </button>

              {/* Chat with Badge 12 */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav("chat");
                  showToast("Opening Messages...", "info");
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeNav === "chat"
                    ? "bg-[#DDE9E2] text-[#215935]"
                    : "text-[#525252] hover:bg-black/5 hover:text-black"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Chat</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#215935] text-white">
                  12
                </span>
              </button>

              {/* Candidate Search */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav("candidate-search");
                  showToast("Opening Candidate Search...", "info");
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeNav === "candidate-search"
                    ? "bg-[#DDE9E2] text-[#215935]"
                    : "text-[#525252] hover:bg-black/5 hover:text-black"
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span>Candidate Search</span>
              </button>

              {/* Pipeline */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav("pipeline");
                  showToast("Opening Hiring Pipeline...", "info");
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeNav === "pipeline"
                    ? "bg-[#DDE9E2] text-[#215935]"
                    : "text-[#525252] hover:bg-black/5 hover:text-black"
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span>Pipeline</span>
              </button>

              {/* Notification */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav("notification");
                  showToast("Opening Notifications...", "info");
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeNav === "notification"
                    ? "bg-[#DDE9E2] text-[#215935]"
                    : "text-[#525252] hover:bg-black/5 hover:text-black"
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Notification</span>
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => {
                  setActiveNav("settings");
                  showToast("Opening Settings...", "info");
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeNav === "settings"
                    ? "bg-[#DDE9E2] text-[#215935]"
                    : "text-[#525252] hover:bg-black/5 hover:text-black"
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Bottom Log Out */}
          <div className="pt-6 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-[#E11D48] hover:bg-red-50 rounded-xl text-sm font-semibold transition-colors cursor-pointer w-full"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* ─────────────────────────────────────────────────────────────
            2. RIGHT CONTENT AREA (Header + Frame 2686)
        ───────────────────────────────────────────────────────────── */}
        <div className="flex-1 ml-[260px] xl:ml-[292px] flex flex-col min-h-screen">
          {/* Top Header Bar (Height 110px matching Figma spec) */}
          <header className="h-[90px] sm:h-[110px] bg-white border-b border-[#E5E7EB] sticky top-0 z-20 px-6 sm:px-10 flex items-center justify-between gap-4">
            {/* Search + Filter */}
            <div className="flex items-center gap-3 flex-1 max-w-[560px]">
              <div className="flex-1 h-11 bg-white border border-[#E5E7EB] rounded-xl flex items-center px-4 gap-3">
                <svg className="w-4 h-4 text-black/40 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search candidates, jobs or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs sm:text-sm text-black placeholder:text-black/40 bg-transparent focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => showToast("Filter options opened", "info")}
                className="h-11 px-4 border border-[#E5E7EB] hover:bg-black/5 rounded-xl text-xs sm:text-sm font-semibold text-black/80 flex items-center gap-2 cursor-pointer transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4 text-black/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Filter</span>
              </button>
            </div>

            {/* Notification Bell + User Profile */}
            <div className="flex items-center gap-5 sm:gap-6">
              {/* Bell Icon with Yellow Badge */}
              <button
                type="button"
                onClick={() => showToast("You have 3 new notifications", "info")}
                className="relative p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-black/70"
                aria-label="Notifications"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FFC107] rounded-full border-2 border-white" />
              </button>

              {/* User Profile Pill */}
              <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-[#E5E7EB]">
                <div className="w-10 h-10 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] font-bold">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-sm font-bold text-black leading-tight">
                    {displayName}
                  </span>
                  <span className="text-xs font-semibold text-[#215935]">
                    {displayPlan}
                  </span>
                </div>
                <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </header>

          {/* ─────────────────────────────────────────────────────────────
              3. FRAME 2686: Main Dashboard Body (padding 40px 35px 80px)
          ───────────────────────────────────────────────────────────── */}
          <main className="flex-1 w-full max-w-[1148px] mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-6 page-smooth-enter">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* =========================================================
                  LEFT COLUMN (8 cols): Banner, Jobs, Candidates, Pipeline
              ========================================================= */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* 1. Hero Banner: "Find the Right Candidates Faster" */}
                <div className="w-full bg-[#205B3A] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Left Text */}
                  <div className="flex flex-col z-10 max-w-[340px]">
                    <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                      Find the Right<br />Candidates Faster
                    </h2>
                    <p className="text-white/85 text-xs sm:text-sm mt-3 leading-relaxed">
                      Post jobs, search candidates &amp; manage your hiring pipeline in one place.
                    </p>
                  </div>

                  {/* Right Illustration: Woman with Laptop Vector */}
                  <div className="relative w-[200px] h-[150px] sm:w-[240px] sm:h-[170px] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full">
                      {/* Potted Plant */}
                      <path d="M210 145 C205 130, 215 110, 225 105 C222 120, 215 135, 210 145 Z" fill="#2E7D4E" />
                      <path d="M220 150 C218 135, 230 120, 238 118 C232 130, 225 142, 220 150 Z" fill="#3D9961" />
                      <rect x="208" y="145" width="22" height="20" rx="3" fill="#17472A" />
                      
                      {/* Floating Briefcase Icon */}
                      <rect x="145" y="20" width="36" height="26" rx="4" fill="#2E7D4E" opacity="0.6" />
                      <path d="M157 20 V16 A3 3 0 0 1 169 16 V20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

                      {/* Woman Character */}
                      {/* Hair background */}
                      <path d="M85 85 C80 50, 110 35, 130 50 C145 60, 140 90, 142 110 C130 115, 95 115, 85 85 Z" fill="#1C1917" />
                      {/* Face */}
                      <circle cx="112" cy="70" r="18" fill="#FBCFE8" />
                      {/* Hair bangs */}
                      <path d="M98 62 C108 55, 125 58, 128 68 C120 62, 105 63, 98 62 Z" fill="#1C1917" />
                      {/* Torso/Shirt */}
                      <path d="M90 115 C90 98, 135 98, 135 115 L145 160 L80 160 Z" fill="#2E7D4E" />
                      {/* Arms and Laptop */}
                      <rect x="80" y="125" width="70" height="35" rx="3" fill="#1C1917" />
                      <path d="M70 155 L160 155" stroke="#44403C" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* 2. Job Posting Table Card */}
                <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-sm">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                    <h3 className="font-bold text-lg text-black">Job Posting</h3>
                    <button
                      type="button"
                      onClick={() => showToast("Opening Job Posting Wizard...", "info")}
                      className="px-3.5 py-1.5 border border-[#215935] hover:bg-[#215935]/5 text-[#215935] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>+ Post New Job</span>
                    </button>
                  </div>

                  {/* Table */}
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm mt-2">
                      <thead>
                        <tr className="border-b border-[#E5E7EB] text-black/80 font-bold">
                          <th className="py-3 px-2">Job Title</th>
                          <th className="py-3 px-2">Location</th>
                          <th className="py-3 px-2 text-center">Applicants</th>
                          <th className="py-3 px-2 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB] text-black">
                        {/* Row 1 */}
                        <tr className="hover:bg-black/[0.015] transition-colors">
                          <td className="py-3.5 px-2 font-semibold">Cardiologist</td>
                          <td className="py-3.5 px-2 text-black/70">Bangalore, India</td>
                          <td className="py-3.5 px-2 text-center font-medium">25</td>
                          <td className="py-3.5 px-2 text-right">
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
                              Active
                            </span>
                          </td>
                        </tr>

                        {/* Row 2 */}
                        <tr className="hover:bg-black/[0.015] transition-colors">
                          <td className="py-3.5 px-2 font-semibold">Neurologist</td>
                          <td className="py-3.5 px-2 text-black/70">Delhi, India</td>
                          <td className="py-3.5 px-2 text-center font-medium">18</td>
                          <td className="py-3.5 px-2 text-right">
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
                              Active
                            </span>
                          </td>
                        </tr>

                        {/* Row 3 */}
                        <tr className="hover:bg-black/[0.015] transition-colors">
                          <td className="py-3.5 px-2 font-semibold">Orthopedic</td>
                          <td className="py-3.5 px-2 text-black/70">Chennai, India</td>
                          <td className="py-3.5 px-2 text-center font-medium">30</td>
                          <td className="py-3.5 px-2 text-right">
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
                              Active
                            </span>
                          </td>
                        </tr>

                        {/* Row 4 */}
                        <tr className="hover:bg-black/[0.015] transition-colors">
                          <td className="py-3.5 px-2 font-semibold">Cardiologist</td>
                          <td className="py-3.5 px-2 text-black/70">Berlin, Germany</td>
                          <td className="py-3.5 px-2 text-center font-medium">14</td>
                          <td className="py-3.5 px-2 text-right">
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#F3F4F6] text-[#4B5563]">
                              Closed
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Candidate Search Card */}
                <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-sm">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4">
                    <h3 className="font-bold text-lg text-black">Candidate Search</h3>
                    <button
                      type="button"
                      onClick={() => showToast("Opening full candidates directory...", "info")}
                      className="text-xs font-bold text-[#215935] hover:underline cursor-pointer"
                    >
                      See all
                    </button>
                  </div>

                  {/* Inner Search & Filter */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-10 bg-white border border-[#E5E7EB] rounded-xl flex items-center px-3.5 gap-2.5">
                      <svg className="w-4 h-4 text-black/40 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search by skills, role, experience...."
                        value={candidateQuery}
                        onChange={(e) => setCandidateQuery(e.target.value)}
                        className="w-full text-xs text-black placeholder:text-black/40 bg-transparent focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("Search filter applied", "info")}
                      className="h-10 px-3.5 border border-[#E5E7EB] hover:bg-black/5 rounded-xl text-xs font-semibold text-black/80 flex items-center gap-1.5 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-black/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span>Filter</span>
                    </button>
                  </div>

                  {/* 3 Candidate Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Candidate 1: Dr. Courtney Henry */}
                    <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#E5EDE7]">
                            <Image
                              src="/doctor1.jpg"
                              alt="Dr. Courtney Henry"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-black leading-tight">Dr. Courtney Henry</h4>
                            <p className="text-[11px] text-black/60 mt-0.5">Cardiologist, 8 yrs Exp.</p>
                          </div>
                        </div>
                        <p className="text-[10px] text-black/50 mt-2">Bangalore, India</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast("Viewing Dr. Courtney Henry's profile...", "info")}
                        className="w-full mt-3 py-1.5 bg-[#215935] hover:bg-[#1a472a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>
                    </div>

                    {/* Candidate 2: AI Match Locked */}
                    <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-black/[0.02] flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-black/70 mb-2 shadow-sm">
                        <svg className="w-4 h-4 text-black/70" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-xs text-black">AI Match Available</h4>
                      <p className="text-[11px] text-black/60 mt-0.5">Explore AI Workspace</p>
                      <button
                        type="button"
                        onClick={() => showToast("Please upgrade to Pro to unlock AI matching.", "info")}
                        className="w-full mt-3 py-1.5 border border-[#215935] text-[#215935] hover:bg-[#215935]/5 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>
                    </div>

                    {/* Candidate 3: Contact Details Locked */}
                    <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-black/[0.02] flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-black/70 mb-2 shadow-sm">
                        <svg className="w-4 h-4 text-black/70" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-xs text-black">Contact Details Available</h4>
                      <p className="text-[11px] text-black/60 mt-0.5">Start Free Trial</p>
                      <button
                        type="button"
                        onClick={() => showToast("Start free trial to unlock candidate contact details.", "info")}
                        className="w-full mt-3 py-1.5 border border-[#215935] text-[#215935] hover:bg-[#215935]/5 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Pipeline Overview Card */}
                <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-sm">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4">
                    <h3 className="font-bold text-lg text-black">Pipeline Overview</h3>
                    <button
                      type="button"
                      onClick={() => showToast("Opening full pipeline...", "info")}
                      className="text-xs font-bold text-[#215935] hover:underline cursor-pointer"
                    >
                      See all
                    </button>
                  </div>

                  {/* 4 Stage Columns */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Stage 1: Longlist */}
                    <div className="p-3.5 rounded-xl border border-[#77BF7A] bg-[#F7FCF8] flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#215935] mb-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-xs text-black">Longlist</h4>
                        <p className="text-[11px] text-black/60 mt-1 leading-snug">
                          34 Candidates have applied for this role.
                        </p>
                      </div>
                    </div>

                    {/* Stage 2: Shortlisted */}
                    <div className="p-3.5 rounded-xl border border-[#F59E0B] bg-[#FFFDF7] flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#D97706] mb-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-xs text-black">Shortlisted</h4>
                        <p className="text-[11px] text-black/60 mt-1 leading-snug">
                          25 Candidates have been shortlisted.
                        </p>
                      </div>
                    </div>

                    {/* Stage 3: Interview 1 */}
                    <div className="p-3.5 rounded-xl border border-[#A855F7] bg-[#FAF5FF] flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9333EA] mb-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-xs text-black">Interview 1</h4>
                        <p className="text-[11px] text-black/60 mt-1 leading-snug">
                          15 Candidates are select for 1st interviews.
                        </p>
                      </div>
                    </div>

                    {/* Stage 4: Interview 2 */}
                    <div className="p-3.5 rounded-xl border border-[#38BDF8] bg-[#F0F9FF] flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0284C7] mb-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-xs text-black">Interview 2</h4>
                        <p className="text-[11px] text-black/60 mt-1 leading-snug">
                          Top candidates are selected for 2nd round.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================================================
                  RIGHT COLUMN (4 cols): Profile, Chats, Notifications, Promo
              ========================================================= */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* 1. Company Profile (60% Progress Ring) */}
                <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-sm">
                  <h3 className="font-bold text-base text-black">Company Profile</h3>
                  <p className="text-xs text-black/60 mt-0.5">Complete your company profile</p>

                  <div className="flex items-center justify-between gap-4 mt-5">
                    {/* Progress Circle Ring (60%) */}
                    <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                        {/* Background Ring */}
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3.2"
                        />
                        {/* 60% Progress Green Ring */}
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#205B3A"
                          strokeWidth="3.2"
                          strokeDasharray="60, 100"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-bold text-base text-black">60%</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => showToast("Opening company profile editor...", "info")}
                      className="px-4 py-2 border border-[#215935] hover:bg-[#215935]/5 text-[#215935] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Complete Now
                    </button>
                  </div>
                </div>

                {/* 2. Recent Chats Card */}
                <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3">
                    <h3 className="font-bold text-base text-black">Recent Chats</h3>
                    <button
                      type="button"
                      onClick={() => showToast("Opening messenger...", "info")}
                      className="text-xs font-bold text-[#215935] hover:underline cursor-pointer"
                    >
                      See all
                    </button>
                  </div>

                  <div className="divide-y divide-[#E5E7EB]">
                    {/* Chat Item 1: Dr. Courtney Henry */}
                    <div className="py-3 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full flex-shrink-0">
                        <Image
                          src="/doctor1.jpg"
                          alt="Dr. Courtney Henry"
                          fill
                          className="object-cover rounded-full"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] rounded-full border-2 border-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-black truncate">Dr. Courtney Henry</h4>
                          <span className="text-[10px] text-black/50">Today</span>
                        </div>
                        <p className="text-[11px] text-black/60 truncate mt-0.5">I&apos;m Available at 3pm.</p>
                      </div>
                    </div>

                    {/* Chat Item 2: Dr. Esther Warren */}
                    <div className="py-3 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full flex-shrink-0">
                        <Image
                          src="/doctor2.jpg"
                          alt="Dr. Esther Warren"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-black truncate">Dr. Esther Warren</h4>
                          <span className="text-[10px] text-black/50">10:30 AM</span>
                        </div>
                        <p className="text-[11px] text-black/60 truncate mt-0.5">Thank you !</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Notification Card */}
                <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3">
                    <h3 className="font-bold text-base text-black">Notification</h3>
                    <button
                      type="button"
                      onClick={() => showToast("Opening all notifications...", "info")}
                      className="text-xs font-bold text-[#215935] hover:underline cursor-pointer"
                    >
                      See all
                    </button>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    {/* Item 1: Message from Dr. Neha */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#D97706] flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-black leading-tight truncate">
                            New Message from Dr. Neha Sharma
                          </h4>
                          <span className="text-[10px] text-black/40 flex-shrink-0 ml-2">9:05 AM</span>
                        </div>
                        <p className="text-[11px] text-black/60 mt-0.5">You&apos;ve a new message</p>
                      </div>
                    </div>

                    {/* Item 2: Application received */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-black leading-tight truncate">
                            Application received for cardiologist role
                          </h4>
                          <span className="text-[10px] text-black/40 flex-shrink-0 ml-2">11:21 AM</span>
                        </div>
                        <p className="text-[11px] text-black/60 mt-0.5">Application was received</p>
                      </div>
                    </div>

                    {/* Item 3: Interview scheduled */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-black leading-tight truncate">
                            Interview scheduled with Dr. Wade Warren
                          </h4>
                          <span className="text-[10px] text-black/40 flex-shrink-0 ml-2">Yesterday</span>
                        </div>
                        <p className="text-[11px] text-black/60 mt-0.5">Interview scheduled on today</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Promo Card: 25+ More Candidates Available */}
                <div className="w-full bg-[#FFFDF5] rounded-2xl border-2 border-dashed border-[#F59E0B] p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <h3 className="font-bold text-sm text-black">25+ More Candidates Available</h3>
                  </div>

                  <p className="text-xs text-black/70 leading-relaxed">
                    Explore AI-powered candidate matching, advanced search, contact details, and deeper hiring insights.
                  </p>

                  <Link
                    href="/plans"
                    className="w-full mt-4 py-2.5 bg-[#205B3A] hover:bg-[#1a472a] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center cursor-pointer btn-spring shadow-sm"
                  >
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F8F6]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#205B3A]" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
