/**
 * Payment and Subscription Service Type Definitions
 */

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
