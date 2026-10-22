import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Confirmed",
  description:
    "Your Medicare Hospitals free trial has been activated successfully. Access all premium recruitment and healthcare staffing tools.",
  alternates: {
    canonical: "/congratulations",
  },
  openGraph: {
    title: "Subscription Confirmed | Medicare Hospitals",
    description: "Your Medicare Hospitals free trial has been activated successfully.",
    url: "https://match2health.com/congratulations",
  },
  robots: {
    index: false, // Prevent checkout confirmation pages from polluting public search indexing
    follow: true,
  },
};

export default function CongratulationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
