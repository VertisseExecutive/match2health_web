import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organization Plans & Pricing",
  description:
    "Choose the right organization plan for Medicare Hospitals. Access AI-powered candidate search, team management, and 14-day free trial.",
  alternates: {
    canonical: "/plans",
  },
  openGraph: {
    title: "Organization Plans & Pricing | Medicare Hospitals",
    description: "Choose the right plan for your medical organization with full feature access.",
    url: "https://match2health.com/plans",
  },
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
