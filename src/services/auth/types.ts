/**
 * Authentication Service Type Definitions
 */

export type UserRole = "candidate" | "doctor" | "hospital" | "admin";

export interface User {
  id?: number;
  email: string;
  username?: string;
  role?: UserRole | string;
  is_verified?: boolean;
  verification_status?: string;
  organizationName?: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
    is_verified?: boolean;
    verification_status?: string;
  };
  two_factor_status?: string;
  message?: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface SignupPayload {
  email: string;
  password?: string;
  role: "candidate" | "doctor" | "hospital";
  username: string;
  company_name?: string;
}

export interface SignupResponse {
  message: string;
  email?: string;
  user_id?: number;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
  fcm_token?: string;
}

export interface VerifyOtpResponse {
  access?: string;
  refresh?: string;
  message?: string;
  user?: User;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyForgotOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyForgotOtpResponse {
  reset_token: string;
  message?: string;
}

export interface ResetPasswordPayload {
  reset_token: string;
  new_password: string;
}

export interface StandardApiResponse {
  success?: boolean;
  message?: string;
  detail?: string;
}

