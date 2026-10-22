import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Account",
  description:
    "Sign in to verify your Medicare Hospitals organization account to activate your subscription and free trial.",
  alternates: {
    canonical: "/verify-account",
  },
  openGraph: {
    title: "Verify Account | Medicare Hospitals",
    description: "Sign in to verify your organization account and access medical staffing features.",
    url: "https://match2health.com/verify-account",
  },
};

export default function VerifyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
