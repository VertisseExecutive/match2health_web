export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.match2health.com/api";

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

export interface CheckoutSessionResponse {
  success: boolean;
  message?: string;
  data?: {
    checkout_url?: string;
    session_id?: string;
    reason?: string;
  };
}

export interface SubscriptionStatusResponse {
  success: boolean;
  message?: string;
  data?: {
    status?: string;
    is_active?: boolean;
    plan?: string;
    cancel_at_period_end?: boolean;
    current_period_end?: string;
  };
}

// 1. Auth Login
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg =
      data.detail ||
      data.message ||
      data.error ||
      (typeof data === "string" ? data : "Invalid email or password");
    throw new Error(errorMsg);
  }

  return data as LoginResponse;
}

// 2. Create Stripe Checkout Session
export async function createCheckoutSession(
  plan: "monthly" | "yearly",
  token: string
): Promise<CheckoutSessionResponse> {
  const res = await fetch(`${API_BASE_URL}/payments/create-checkout-session/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ plan }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg =
      data.message ||
      (data.data && data.data.reason) ||
      "Unable to create payment session";
    const err = new Error(errorMsg);
    (err as any).status = res.status;
    (err as any).data = data;
    throw err;
  }

  return data as CheckoutSessionResponse;
}

// 3. Get Subscription Status
export async function getSubscriptionStatus(token: string): Promise<SubscriptionStatusResponse> {
  const res = await fetch(`${API_BASE_URL}/payments/subscription/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  return data as SubscriptionStatusResponse;
}
