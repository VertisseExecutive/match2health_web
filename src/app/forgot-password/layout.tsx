import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Match2Health",
  description: "Reset your Match2Health account password securely with an OTP.",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
