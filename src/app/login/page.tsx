"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import { loginUser } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { AuthHeroBanner, AuthHeader, AuthLogin } from "../../components/auth";

/**
 * Screen 1: Login Page
 * Modular architecture consuming AuthHeader, AuthLogin, and AuthHeroBanner
 */
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const selectedPlan = useAppSelector((state) => state.plan.selectedPlan);
  const { showToast } = useToast();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (emailOrPhone: string, password: string) => {
    setErrorMessage(null);

    const cleanInput = emailOrPhone.trim();
    const cleanPassword = password.trim();

    if (!cleanInput || !cleanPassword) {
      const msg = "Please enter both email/phone and password.";
      setErrorMessage(msg);
      showToast(msg, "error");
      return;
    }

    dispatch(loginStart());
    showToast("Verifying credentials with server...", "loading");

    try {
      const res = await loginUser(cleanInput, cleanPassword);

      dispatch(
        loginSuccess({
          user: res.user,
          access: res.access,
          refresh: res.refresh,
        })
      );

      const roleDisplay = res.user.role ? res.user.role.toUpperCase() : "HOSPITAL";
      showToast(`Welcome back! Verified as ${roleDisplay}.`, "success");

      setTimeout(() => {
        if (selectedPlan) {
          router.push("/payment-details");
        } else if (res.user.role === "hospital") {
          router.push("/plans");
        } else {
          router.push("/plans");
        }
      }, 700);
    } catch (err: any) {
      const msg = err.message || "Invalid credentials. Please try again.";
      setErrorMessage(msg);
      showToast(msg, "error");
      dispatch(loginFailure(msg));
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8F8F6] text-black font-sans overflow-x-hidden">
      {/* Left Column: Hero Banner with Doctor Illustration (Desktop Only) */}
      <AuthHeroBanner />

      {/* Right Column: Interactive Login Container */}
      <main className="flex-1 w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 py-8 sm:py-12 relative page-smooth-enter">
        <div className="w-full max-w-[644px] flex flex-col items-center">
          {/* Header Component (Back button, mobile logo, title & subtitle) */}
          <AuthHeader />

          {/* Login Form Component (Inputs, buttons, social logins) */}
          <AuthLogin
            onSubmit={handleLogin}
            isLoading={auth.isLoading}
            errorMessage={errorMessage}
            signUpHref="/plans"
            forgotPasswordHref="/forgot-password"
          />
        </div>
      </main>
    </div>
  );
}
