import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Details",
  description:
    "Enter secure payment details to start your free 14-day trial on Medicare Hospitals with 256-bit encryption.",
  alternates: {
    canonical: "/payment-details",
  },
  openGraph: {
    title: "Payment Details | Medicare Hospitals",
    description: "Enter secure payment details to activate your free trial. No charges today.",
    url: "https://match2health.com/payment-details",
  },
};

export default function PaymentDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
