/**
 * Central API Configuration
 * Strictly retrieves backend connection URL from environment variables (.env.local / Vercel Environment)
 * Zero hardcoded URLs in source code for maximum security.
 */

export const API_BASE_URL: string = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

/**
 * Centralized API endpoints builder
 */
export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login/`,
    signup: `${API_BASE_URL}/auth/signup/`,
    verifyOtp: `${API_BASE_URL}/auth/verify-otp/`,
    resendOtp: `${API_BASE_URL}/auth/resend-otp/`,
    sendOtp: `${API_BASE_URL}/auth/send-otp/`,
    verifyGenericOtp: `${API_BASE_URL}/auth/verify-generic-otp/`,
    resendGenericOtp: `${API_BASE_URL}/auth/resend-generic-otp/`,
    refreshToken: `${API_BASE_URL}/auth/token/refresh/`,
    verificationStatus: `${API_BASE_URL}/auth/verification-status/`,
    submitVerification: `${API_BASE_URL}/auth/submit-verification/`,
    forgotPassword: `${API_BASE_URL}/auth/forgot-password/`,
    verifyForgotOtp: `${API_BASE_URL}/auth/verify-forgot-otp/`,
    resetPassword: `${API_BASE_URL}/auth/reset-password/`,
    logout: `${API_BASE_URL}/auth/logout/`,
    twoFactorStatus: `${API_BASE_URL}/auth/2fa/status/`,
    twoFactorEnable: `${API_BASE_URL}/auth/2fa/enable/`,
    twoFactorVerify: `${API_BASE_URL}/auth/2fa/enable/verify/`,
    twoFactorDisable: `${API_BASE_URL}/auth/2fa/disable/`,
    twoFactorLoginVerify: `${API_BASE_URL}/auth/2fa/login/verify/`,
    registerFcmToken: `${API_BASE_URL}/fcm-token/register/`,
    unregisterFcmToken: `${API_BASE_URL}/fcm-token/unregister/`,
  },
  payments: {
    createCheckoutSession: `${API_BASE_URL}/payments/create-checkout-session/`,
    subscriptionStatus: `${API_BASE_URL}/payments/subscription/`,
  },
} as const;
