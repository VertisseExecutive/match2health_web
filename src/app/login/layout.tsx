import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to your Medicare Hospitals account. Access healthcare staffing, candidate ranking, and organization management tools.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Login | Medicare Hospitals",
    description: "Please login to your account to access Medicare Hospitals platform.",
    url: "https://match2health.com/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
