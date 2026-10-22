import { API_ENDPOINTS } from "../config";
import {
  LoginResponse,
  RefreshTokenResponse,
  SignupPayload,
  SignupResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  VerifyForgotOtpResponse,
  ResetPasswordPayload,
  StandardApiResponse,
} from "./types";

export * from "./types";

/**
 * Helper to handle fetch errors cleanly
 */
async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg =
      data.detail ||
      data.message ||
      data.error ||
      (typeof data === "string" ? data : `Request failed with status ${res.status}`);
    throw new Error(errorMsg);
  }
  return data as T;
}

/**
 * Login user against Match2Health backend
 */
export async function loginUser(
  email: string,
  password: string,
  fcmToken?: string
): Promise<LoginResponse> {
  const body: Record<string, string> = { email, password };
  if (fcmToken) body.fcm_token = fcmToken;

  const res = await fetch(API_ENDPOINTS.auth.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<LoginResponse>(res);
}

/**
 * Refresh JWT access token
 */
export async function refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
  const res = await fetch(API_ENDPOINTS.auth.refreshToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  return handleResponse<RefreshTokenResponse>(res);
}

/**
 * Register a new user (Candidate, Doctor, or Hospital)
 */
export async function signupUser(payload: SignupPayload): Promise<SignupResponse> {
  const res = await fetch(API_ENDPOINTS.auth.signup, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<SignupResponse>(res);
}

/**
 * Verify Registration OTP
 */
export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  const res = await fetch(API_ENDPOINTS.auth.verifyOtp, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<VerifyOtpResponse>(res);
}

/**
 * Resend Registration OTP
 */
export async function resendOtp(email: string): Promise<StandardApiResponse> {
  const res = await fetch(API_ENDPOINTS.auth.resendOtp, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return handleResponse<StandardApiResponse>(res);
}

/**
 * Request OTP for Forgot Password
 */
export async function forgotPassword(email: string): Promise<StandardApiResponse> {
  const res = await fetch(API_ENDPOINTS.auth.forgotPassword, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return handleResponse<StandardApiResponse>(res);
}

/**
 * Verify Forgot Password OTP to receive reset_token
 */
export async function verifyForgotOtp(
  email: string,
  otp: string
): Promise<VerifyForgotOtpResponse> {
  const res = await fetch(API_ENDPOINTS.auth.verifyForgotOtp, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  return handleResponse<VerifyForgotOtpResponse>(res);
}

/**
 * Reset password using the reset_token
 */
export async function resetPassword(payload: ResetPasswordPayload): Promise<StandardApiResponse> {
  const res = await fetch(API_ENDPOINTS.auth.resetPassword, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<StandardApiResponse>(res);
}

/**
 * Logout user, invalidate refresh token and unregister FCM token
 */
export async function logoutUser(
  token?: string,
  refreshToken?: string,
  fcmToken?: string
): Promise<StandardApiResponse> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(API_ENDPOINTS.auth.logout, {
    method: "POST",
    headers,
    body: JSON.stringify({
      refresh_token: refreshToken || "",
      fcm_token: fcmToken || "",
    }),
  });

  return handleResponse<StandardApiResponse>(res);
}
