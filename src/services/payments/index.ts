import { API_ENDPOINTS } from "../config";
import { CheckoutSessionResponse, SubscriptionStatusResponse } from "./types";

export * from "./types";

/**
 * Create Stripe checkout session for company subscription
 * @param plan Subscription billing cycle ('monthly' | 'yearly')
 * @param token JWT access token
 */
export async function createCheckoutSession(
  plan: "monthly" | "yearly",
  token: string
): Promise<CheckoutSessionResponse> {
  const res = await fetch(API_ENDPOINTS.payments.createCheckoutSession, {
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

/**
 * Fetch current subscription status for logged in company
 * @param token JWT access token
 */
export async function getSubscriptionStatus(token: string): Promise<SubscriptionStatusResponse> {
  const res = await fetch(API_ENDPOINTS.payments.subscriptionStatus, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  return data as SubscriptionStatusResponse;
}
